
namespace ChartTester {
	partial class Form1 {
		/// <summary>
		///  Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		///  Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if (disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		///  Required method for Designer support - do not modify
		///  the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			this.menuStrip1 = new System.Windows.Forms.MenuStrip();
			this.SunburstMenu = new System.Windows.Forms.ToolStripMenuItem();
			this.BetterSunburst = new System.Windows.Forms.ToolStripMenuItem();
			this.Sunburst = new System.Windows.Forms.ToolStripMenuItem();
			this.VasturianoSunburst = new System.Windows.Forms.ToolStripMenuItem();
			this.ZoomableSunburst = new System.Windows.Forms.ToolStripMenuItem();
			this.LimitedSunburst = new System.Windows.Forms.ToolStripMenuItem();
			this.ChartPanel = new System.Windows.Forms.Panel();
			this.menuStrip1.SuspendLayout();
			this.SuspendLayout();
			// 
			// menuStrip1
			// 
			this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.SunburstMenu});
			this.menuStrip1.Location = new System.Drawing.Point(0, 0);
			this.menuStrip1.Name = "menuStrip1";
			this.menuStrip1.Size = new System.Drawing.Size(1090, 24);
			this.menuStrip1.TabIndex = 1;
			this.menuStrip1.Text = "menuStrip1";
			// 
			// SunburstMenu
			// 
			this.SunburstMenu.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.BetterSunburst,
            this.Sunburst,
            this.VasturianoSunburst,
            this.ZoomableSunburst,
            this.LimitedSunburst});
			this.SunburstMenu.Name = "SunburstMenu";
			this.SunburstMenu.Size = new System.Drawing.Size(66, 20);
			this.SunburstMenu.Text = "Sunburst";
			// 
			// BetterSunburst
			// 
			this.BetterSunburst.Name = "BetterSunburst";
			this.BetterSunburst.Size = new System.Drawing.Size(176, 22);
			this.BetterSunburst.Text = "BetterSunburst";
			this.BetterSunburst.Click += new System.EventHandler(this.BetterSunburst_Click);
			// 
			// Sunburst
			// 
			this.Sunburst.Name = "Sunburst";
			this.Sunburst.Size = new System.Drawing.Size(176, 22);
			this.Sunburst.Text = "Sunburst";
			this.Sunburst.Click += new System.EventHandler(this.Sunburst_Click);
			// 
			// VasturianoSunburst
			// 
			this.VasturianoSunburst.Name = "VasturianoSunburst";
			this.VasturianoSunburst.Size = new System.Drawing.Size(176, 22);
			this.VasturianoSunburst.Text = "VasturianoSunburst";
			this.VasturianoSunburst.Click += new System.EventHandler(this.VasturianoSunburst_Click);
			// 
			// ZoomableSunburst
			// 
			this.ZoomableSunburst.Name = "ZoomableSunburst";
			this.ZoomableSunburst.Size = new System.Drawing.Size(176, 22);
			this.ZoomableSunburst.Text = "ZoomableSunburst";
			this.ZoomableSunburst.Click += new System.EventHandler(this.ZoomableSunburst_Click);
			// 
			// LimitedSunburst
			// 
			this.LimitedSunburst.Name = "LimitedSunburst";
			this.LimitedSunburst.Size = new System.Drawing.Size(176, 22);
			this.LimitedSunburst.Text = "LimitedSunburst";
			this.LimitedSunburst.Click += new System.EventHandler(this.LimitedSunburst_Click);
			// 
			// ChartPanel
			// 
			this.ChartPanel.Dock = System.Windows.Forms.DockStyle.Fill;
			this.ChartPanel.Location = new System.Drawing.Point(0, 24);
			this.ChartPanel.Name = "ChartPanel";
			this.ChartPanel.Size = new System.Drawing.Size(1090, 715);
			this.ChartPanel.TabIndex = 2;
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(1090, 739);
			this.Controls.Add(this.ChartPanel);
			this.Controls.Add(this.menuStrip1);
			this.MainMenuStrip = this.menuStrip1;
			this.Name = "Form1";
			this.Text = "Form1";
			this.menuStrip1.ResumeLayout(false);
			this.menuStrip1.PerformLayout();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion
		private System.Windows.Forms.MenuStrip menuStrip1;
		private System.Windows.Forms.ToolStripMenuItem SunburstMenu;
		private System.Windows.Forms.ToolStripMenuItem BetterSunburst;
		private System.Windows.Forms.ToolStripMenuItem Sunburst;
		private System.Windows.Forms.ToolStripMenuItem VasturianoSunburst;
		private System.Windows.Forms.ToolStripMenuItem ZoomableSunburst;
		private System.Windows.Forms.ToolStripMenuItem LimitedSunburst;
		private System.Windows.Forms.Panel ChartPanel;
	}
}

