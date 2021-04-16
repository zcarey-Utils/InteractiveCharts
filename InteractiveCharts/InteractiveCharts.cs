﻿using CefSharp;
using CefSharp.SchemeHandler;
using CefSharp.WinForms;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace InteractiveCharts {
	public static class InteractiveCharts {

        private static bool initialized = false;

		public static void Initialize() {
            if (initialized) return;
            else initialized = true;
#if ANYCPU
            //Only required for PlatformTarget of AnyCPU
            AppDomain.CurrentDomain.AssemblyResolve += Resolver;
#endif

			//For Windows 7 and above, best to include relevant app.manifest entries as well
			Cef.EnableHighDPISupport();

            //Set up cach location
            var settings = new CefSettings() {
                //By default CefSharp will use an in-memory cache, you need to specify a Cache Folder to persist data
                CachePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "CefSharp\\Cache")
            };

            //Set the resource folder flor loading local resources
            /*string resourceFolder = Path.GetFullPath("Sunburst");
            settings.RegisterScheme(new CefCustomScheme {
                SchemeName = "localfolder",
                DomainName = "cefsharp",
                SchemeHandlerFactory = new FolderSchemeHandlerFactory(
                    rootFolder: resourceFolder,
                    hostName: "cefsharp",
                    defaultPage: "index.html"
                )
            });*/

            //Example of setting a command line argument
            //Enables WebRTC
            // - CEF Doesn't currently support permissions on a per browser basis see https://bitbucket.org/chromiumembedded/cef/issues/2582/allow-run-time-handling-of-media-access
            // - CEF Doesn't currently support displaying a UI for media access permissions
            //
            //NOTE: WebRTC Device Id's aren't persisted as they are in Chrome see https://bitbucket.org/chromiumembedded/cef/issues/2064/persist-webrtc-deviceids-across-restart
            settings.CefCommandLineArgs.Add("enable-media-stream");
            //https://peter.sh/experiments/chromium-command-line-switches/#use-fake-ui-for-media-stream
            settings.CefCommandLineArgs.Add("use-fake-ui-for-media-stream");
            //For screen sharing add (see https://bitbucket.org/chromiumembedded/cef/issues/2582/allow-run-time-handling-of-media-access#comment-58677180)
            settings.CefCommandLineArgs.Add("enable-usermedia-screen-capturing");

            //Perform dependency check to make sure all relevant resources are in our output directory.
            Cef.Initialize(settings, performDependencyCheck: true, browserProcessHandler: null);
        }

        // Will attempt to load missing assembly from either x86 or x64 subdir
        //when PlatformTarget is AnyCPU
#if ANYCPU
        private static System.Reflection.Assembly Resolver(object sender, ResolveEventArgs args)
        {
            if (args.Name.StartsWith("CefSharp.Core.Runtime"))
            {
                string assemblyName = args.Name.Split(new[] { ',' }, 2)[0] + ".dll";
                string archSpecificPath = Path.Combine(AppDomain.CurrentDomain.SetupInformation.ApplicationBase,
                                                       Environment.Is64BitProcess ? "x64" : "x86",
                                                       assemblyName);

                return File.Exists(archSpecificPath)
                           ? System.Reflection.Assembly.LoadFile(archSpecificPath)
                           : null;
            }

            return null;
        }
#endif

    }
}
