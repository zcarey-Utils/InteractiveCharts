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
        private readonly string schemeName;
        private readonly string hostName;

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
        public CustomSchemeHandlerFactory(string schemeName = null, string hostName = null) {
            this.schemeName = schemeName;
            this.hostName = hostName;
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

            //Get the absolute path and remove the leading slash
            var asbolutePath = uri.AbsolutePath.Substring(1); 
            ResourceLoader loader = null;

            //Search for ResourceLoader ID #
            int separator = asbolutePath.IndexOf("/");
            int id;
            if((separator > -1) && int.TryParse(asbolutePath.Substring(0, separator), out id)){
                InteractiveCharts.ResourceLoaders.TryGetValue(id, out loader);
                asbolutePath = asbolutePath.Substring(separator + 1); //Adjust uri to only contain the file name now
			}

            // Get file properties
            string fileExtension = Path.GetExtension(asbolutePath);
            var mimeType = GetMimeTypeDelegate(fileExtension);
            Stream stream = null;

            // Check for resources that are loaded by the ResourceLoader
            if(loader != null) {
                if(asbolutePath == "config.js") {
                    stream = loader.LoadConfig();
				}else if(asbolutePath == "data.json") {
                    stream = loader.LoadData();
				}
			}

            // If no stream has been loaded yet, attempt to load from an internal assembly resource.
            if (stream == null) {
                try {
                    var assembly = Assembly.GetExecutingAssembly();
                    stream = assembly.GetManifestResourceStream("InteractiveCharts.Resources." + asbolutePath.Replace('/', '.'));
				} catch (Exception) {
                    stream = null;
				}
            }

            if (stream != null) {
                return ResourceHandler.FromStream(stream, mimeType);
            } else {
                return ResourceHandler.ForErrorMessage("Resource Not Found - " + uri.AbsolutePath, HttpStatusCode.NotFound);
            }
        }
    }
}
