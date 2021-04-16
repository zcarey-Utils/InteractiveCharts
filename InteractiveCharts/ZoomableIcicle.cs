using CefSharp;
using CefSharp.WinForms;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace InteractiveCharts {
	public partial class ZoomableIcicle : UserControl {

		private ChromiumWebBrowser browser;

		public ZoomableIcicle() {
			InitializeComponent();
		}

		protected override void OnLoad(EventArgs e) {
			if (!this.DesignMode) {
				string path = "https://www.google.com/"; //Path.GetFullPath("Sunburst/index.html")
				browser = new ChromiumWebBrowser(path);
				createBrowser();

				browser.IsBrowserInitializedChanged += OnIsBrowserInitializedChanged;
				browser.LoadingStateChanged += OnLoadingStateChanged;
				browser.ConsoleMessage += OnBrowserConsoleMessage;
				browser.StatusMessage += OnBrowserStatusMessage;
				browser.TitleChanged += OnBrowserTitleChanged;
				browser.AddressChanged += OnBrowserAddressChanged;

				var version = string.Format("Chromium: {0}, CEF: {1}, CefSharp: {2}", Cef.ChromiumVersion, Cef.CefVersion, Cef.CefSharpVersion);

				// .NET Core
				var environment = string.Format("Environment: {0}, Runtime: {1}",
					System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture.ToString().ToLowerInvariant(),
					System.Runtime.InteropServices.RuntimeInformation.FrameworkDescription);

				DisplayOutput(string.Format("{0}, {1}", version, environment));
			}

			base.OnLoad(e);
		}

		private void createBrowser() {
			this.SuspendLayout();
			this.Controls.Add(browser);

			this.browser.Dock = System.Windows.Forms.DockStyle.Fill;
			this.browser.Location = new System.Drawing.Point(0, 0);

			this.ResumeLayout();
		}

		private void OnIsBrowserInitializedChanged(object sender, EventArgs e) {
			var b = ((ChromiumWebBrowser)sender);
			this.InvokeOnUiThreadIfRequired(() => b.Focus());
		}

		private void OnBrowserConsoleMessage(object sender, ConsoleMessageEventArgs args) {
			DisplayOutput(string.Format("Line: {0}, Source: {1}, Message: {2}", args.Line, args.Source, args.Message));
		}

		private void OnBrowserStatusMessage(object sender, StatusMessageEventArgs args) {
			//this.InvokeOnUiThreadIfRequired(() => statusLabel.Text = args.Value);
		}

		private void OnLoadingStateChanged(object sender, LoadingStateChangedEventArgs args) {
			SetCanGoBack(args.CanGoBack);
			SetCanGoForward(args.CanGoForward);

			this.InvokeOnUiThreadIfRequired(() => SetIsLoading(!args.CanReload));
		}

		private void OnBrowserTitleChanged(object sender, TitleChangedEventArgs args) {
			this.InvokeOnUiThreadIfRequired(() => Text = args.Title);
		}

		private void OnBrowserAddressChanged(object sender, AddressChangedEventArgs args) {
			//this.InvokeOnUiThreadIfRequired(() => urlTextBox.Text = args.Address);
		}

		private void SetCanGoBack(bool canGoBack) {
			//this.InvokeOnUiThreadIfRequired(() => backButton.Enabled = canGoBack);
		}

		private void SetCanGoForward(bool canGoForward) {
			//this.InvokeOnUiThreadIfRequired(() => forwardButton.Enabled = canGoForward);
		}

		private void SetIsLoading(bool isLoading) {
			/*			goButton.Text = isLoading ?
							"Stop" :
							"Go";
						goButton.Image = isLoading ?
							Properties.Resources.nav_plain_red :
							Properties.Resources.nav_plain_green;
			*/
			HandleToolStripLayout();
		}

		public void DisplayOutput(string output) {
			//this.InvokeOnUiThreadIfRequired(() => outputLabel.Text = output);
		}

		private void HandleToolStripLayout() {
			/*			var width = toolStrip1.Width;
						foreach (ToolStripItem item in toolStrip1.Items) {
							if (item != urlTextBox) {
								width -= item.Width - item.Margin.Horizontal;
							}
						}
						urlTextBox.Width = Math.Max(0, width - urlTextBox.Margin.Horizontal - 18);
			*/
		}

	}
}
