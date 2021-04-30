using CefSharp;
using CefSharp.WinForms;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;

namespace InteractiveCharts {

    /// <summary>
    /// FolderSchemeHandlerFactory is a very simple scheme handler that allows you
    /// to map requests for urls to a folder on your file system. For example
    /// creating a setting the rootFolder to c:\projects\CefSharp\CefSharp.Example\Resources
    /// registering the scheme handler
    /// </summary>
    public class CustomSchemeHandlerFactory : ISchemeHandlerFactory {
        private readonly string rootFolder;
        private readonly string defaultPage;
        private readonly string schemeName;
        private readonly string hostName;
        private readonly FileShare resourceFileShare;

        /// <summary>
        /// <see cref="ResourceHandler.GetMimeType(string)"/> is being deprecated in favour of using
        /// Chromiums native mimeType lookup which is accessible using Cef.GetMimeType, this method is however
        /// not directly available as it exists in CefSharp.Core, to get around this we set
        /// this static delegate with a reference to Cef.GetMimeType when Cef.Initialize is called.
        /// </summary>
        public static Func<string, string> GetMimeTypeDelegate = (s) => { return ResourceHandler.GetMimeType(s); };

        /// <summary>
        /// Initialize a new instance of FolderSchemeHandlerFactory
        /// </summary>
        /// <param name="rootFolder">Root Folder where all your files exist, requests cannot be made outside of this folder</param>
        /// <param name="schemeName">if not null then schemeName checking will be implemented</param>
        /// <param name="hostName">if not null then hostName checking will be implemented</param>
        /// <param name="defaultPage">default page if no page specified, defaults to index.html</param>
        /// <param name="resourceFileShare">file share mode used to open resources, defaults to FileShare.Read</param>
        public CustomSchemeHandlerFactory(string rootFolder, string schemeName = null, string hostName = null, string defaultPage = "index.html", FileShare resourceFileShare = FileShare.Read) {
            this.rootFolder = Path.GetFullPath(rootFolder);
            this.defaultPage = defaultPage;
            this.schemeName = schemeName;
            this.hostName = hostName;
            this.resourceFileShare = resourceFileShare;

            if (!Directory.Exists(this.rootFolder)) {
                throw new DirectoryNotFoundException(this.rootFolder);
            }
        }

        /// <summary>
        /// If the file requested is within the rootFolder then a IResourceHandler reference to the file requested will be returned
        /// otherwise a 404 ResourceHandler will be returned.
        /// </summary>
        /// <param name="browser">the browser window that originated the
        /// request or null if the request did not originate from a browser window
        /// (for example, if the request came from CefURLRequest).</param>
        /// <param name="frame">frame that originated the request
        /// or null if the request did not originate from a browser window
        /// (for example, if the request came from CefURLRequest).</param>
        /// <param name="schemeName">the scheme name</param>
        /// <param name="request">The request. (will not contain cookie data)</param>
        /// <returns>
        /// A IResourceHandler
        /// </returns>
        IResourceHandler ISchemeHandlerFactory.Create(IBrowser browser, IFrame frame, string schemeName, IRequest request) {
            return Create(browser, frame, schemeName, request);
        }

        /// <summary>
        /// If the file requested is within the rootFolder then a IResourceHandler reference to the file requested will be returned
        /// otherwise a 404 ResourceHandler will be returned.
        /// </summary>
        /// <param name="browser">the browser window that originated the
        /// request or null if the request did not originate from a browser window
        /// (for example, if the request came from CefURLRequest).</param>
        /// <param name="frame">frame that originated the request
        /// or null if the request did not originate from a browser window
        /// (for example, if the request came from CefURLRequest).</param>
        /// <param name="schemeName">the scheme name</param>
        /// <param name="request">The request. (will not contain cookie data)</param>
        /// <returns>
        /// A IResourceHandler
        /// </returns>
        protected virtual IResourceHandler Create(IBrowser browser, IFrame frame, string schemeName, IRequest request) {
            if (this.schemeName != null && !schemeName.Equals(this.schemeName, StringComparison.OrdinalIgnoreCase)) {
                return ResourceHandler.ForErrorMessage(string.Format("SchemeName {0} does not match the expected SchemeName of {1}.", schemeName, this.schemeName), HttpStatusCode.NotFound);
            }

            var uri = new Uri(request.Url);

            if (this.hostName != null && !uri.Host.Equals(this.hostName, StringComparison.OrdinalIgnoreCase)) {
                return ResourceHandler.ForErrorMessage(string.Format("HostName {0} does not match the expected HostName of {1}.", uri.Host, this.hostName), HttpStatusCode.NotFound);
            }

/*            if ((browser != null) && (browser is ChromiumWebBrowser chrome)) {
				if ((chrome.Parent != null) && (chrome.Parent is Chart chart)) {
                    chart.ResourceLoader.Test();
				}
			}
*/
            //Get the absolute path and remove the leading slash
            var asbolutePath = uri.AbsolutePath.Substring(1); //"d3.v6.js"
            ResourceLoader loader = null;

            int separator = asbolutePath.IndexOf("/");
            int id;
            if((separator > -1) && int.TryParse(asbolutePath.Substring(0, separator), out id)){
                InteractiveCharts.ResourceLoaders.TryGetValue(id, out loader);
                asbolutePath = asbolutePath.Substring(separator + 1);
			}

            if(asbolutePath == "config.js") {
                var fileExtension = ".js";
                var mimeType = GetMimeTypeDelegate(fileExtension);
                Stream stream = null;

                if (loader != null) {
                    stream = loader.LoadConfig();
                }

                if (stream == null) {
                    var assembly = Assembly.GetExecutingAssembly();
                    stream = assembly.GetManifestResourceStream("InteractiveCharts.Resources." + asbolutePath);
                }

                return ResourceHandler.FromStream(stream, mimeType);
            } else if (asbolutePath == "fileUtil.js" || asbolutePath.StartsWith("d3.v") || asbolutePath == "flare.json") {
                var fileExtension = ".js";
                var mimeType = GetMimeTypeDelegate(fileExtension);
                Stream stream = null;

                if (loader != null) {
                    stream = loader.LoadResource(asbolutePath);
                }
                
                if(stream == null) {
                    var assembly = Assembly.GetExecutingAssembly();
                    stream = assembly.GetManifestResourceStream("InteractiveCharts.Resources." + asbolutePath);
                }

                return ResourceHandler.FromStream(stream, mimeType);
            }

            if (string.IsNullOrEmpty(asbolutePath)) {
                asbolutePath = defaultPage;
            }

            var filePath = WebUtility.UrlDecode(Path.GetFullPath(Path.Combine(rootFolder, asbolutePath)));

            //Check the file requested is within the specified path and that the file exists
            if (filePath.StartsWith(rootFolder, StringComparison.OrdinalIgnoreCase) && File.Exists(filePath)) {
                var fileExtension = Path.GetExtension(filePath);
                var mimeType = GetMimeTypeDelegate(fileExtension);
                var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read, resourceFileShare);
                return ResourceHandler.FromStream(stream, mimeType);
            }

            return ResourceHandler.ForErrorMessage("File Not Found - " + filePath, HttpStatusCode.NotFound);
        }
    }
}
