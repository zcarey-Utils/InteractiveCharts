using CefSharp;
using CefSharp.WinForms;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace InteractiveCharts {
	public abstract partial class Chart : UserControl {

		#region Browser Events
		internal event EventHandler IsBrowserInitializedChanged {
			add { browser.IsBrowserInitializedChanged += value; }
			remove { browser.IsBrowserInitializedChanged -= value; }
		}

		internal event EventHandler<LoadingStateChangedEventArgs> LoadingStateChanged {
			add { browser.LoadingStateChanged += value; }
			remove { browser.LoadingStateChanged -= value; }
		}

		internal event EventHandler<ConsoleMessageEventArgs> ConsoleMessage {
			add { browser.ConsoleMessage += value; }
			remove { browser.ConsoleMessage -= value; }
		}

		internal event EventHandler<StatusMessageEventArgs> StatusMessage {
			add { browser.StatusMessage += value; }
			remove { browser.StatusMessage -= value; }
		}

		internal event EventHandler<TitleChangedEventArgs> TitleChanged {
			add { browser.TitleChanged += value; }
			remove { browser.TitleChanged -= value; }
		}

		internal event EventHandler<AddressChangedEventArgs> AddressChanged {
			add { browser.AddressChanged += value; }
			remove { browser.AddressChanged -= value; }
		}
		#endregion

		protected abstract string URL { get; }
		protected abstract string DesignModeName { get; }

		private ChromiumWebBrowser browser;

		internal Chart() {
			InitializeComponent();
		}

		protected override void OnLoad(EventArgs e) {
			if (!this.DesignMode) {
				browser = new ChromiumWebBrowser(Path.GetFullPath("Resources/" + URL));
				this.SuspendLayout();
				this.Controls.Add(browser);

				this.browser.Dock = System.Windows.Forms.DockStyle.Fill;
				this.browser.Location = new System.Drawing.Point(0, 0);

				this.ResumeLayout();
				/*
								browser.IsBrowserInitializedChanged += OnIsBrowserInitializedChanged;
								browser.LoadingStateChanged += OnLoadingStateChanged;
								browser.ConsoleMessage += OnBrowserConsoleMessage;
								browser.StatusMessage += OnBrowserStatusMessage;
								browser.TitleChanged += OnBrowserTitleChanged;
								browser.AddressChanged += OnBrowserAddressChanged;
				*/
				/*var version = string.Format("Chromium: {0}, CEF: {1}, CefSharp: {2}", Cef.ChromiumVersion, Cef.CefVersion, Cef.CefSharpVersion);

				// .NET Core
				var environment = string.Format("Environment: {0}, Runtime: {1}",
					System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture.ToString().ToLowerInvariant(),
					System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription);

				DisplayOutput(string.Format("{0}, {1}", version, environment));*/
			}

			base.OnLoad(e);
		}

		protected override void OnPaint(PaintEventArgs e) {
			if (this.DesignMode) {
				SizeF size = e.Graphics.MeasureString(DesignModeName, this.Font);
				PointF location = new PointF(
					this.Width / 2 - size.Width / 2,
					this.Height / 2 - size.Height / 2
				);
				e.Graphics.DrawString(DesignModeName, this.Font, new SolidBrush(this.ForeColor), location);
			}
			base.OnPaint(e);
		}

	}
}
