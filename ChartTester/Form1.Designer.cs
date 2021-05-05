
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
			this.Sunburst = new System.Windows.Forms.ToolStripMenuItem();
			this.ZoomableSunburst = new System.Windows.Forms.ToolStripMenuItem();
			this.LimitedSunburst = new System.Windows.Forms.ToolStripMenuItem();
			this.IcicleMenu = new System.Windows.Forms.ToolStripMenuItem();
			this.Icicle = new System.Windows.Forms.ToolStripMenuItem();
			this.ZoomableIcicle = new System.Windows.Forms.ToolStripMenuItem();
			this.menuStrip1.SuspendLayout();
			this.SuspendLayout();
			// 
			// menuStrip1
			// 
			this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.SunburstMenu,
            this.IcicleMenu});
			this.menuStrip1.Location = new System.Drawing.Point(0, 0);
			this.menuStrip1.Name = "menuStrip1";
			this.menuStrip1.Size = new System.Drawing.Size(805, 24);
			this.menuStrip1.TabIndex = 1;
			this.menuStrip1.Text = "menuStrip1";
			// 
			// SunburstMenu
			// 
			this.SunburstMenu.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.Sunburst,
            this.ZoomableSunburst,
            this.LimitedSunburst});
			this.SunburstMenu.Name = "SunburstMenu";
			this.SunburstMenu.Size = new System.Drawing.Size(66, 20);
			this.SunburstMenu.Text = "Sunburst";
			// 
			// Sunburst
			// 
			this.Sunburst.Name = "Sunburst";
			this.Sunburst.Size = new System.Drawing.Size(175, 22);
			this.Sunburst.Text = "Sunburst";
			this.Sunburst.Click += new System.EventHandler(this.Sunburst_Click);
			// 
			// ZoomableSunburst
			// 
			this.ZoomableSunburst.Name = "ZoomableSunburst";
			this.ZoomableSunburst.Size = new System.Drawing.Size(175, 22);
			this.ZoomableSunburst.Text = "ZoomableSunburst";
			this.ZoomableSunburst.Click += new System.EventHandler(this.ZoomableSunburst_Click);
			// 
			// LimitedSunburst
			// 
			this.LimitedSunburst.Name = "LimitedSunburst";
			this.LimitedSunburst.Size = new System.Drawing.Size(175, 22);
			this.LimitedSunburst.Text = "LimitedSunburst";
			this.LimitedSunburst.Click += new System.EventHandler(this.LimitedSunburst_Click);
			// 
			// IcicleMenu
			// 
			this.IcicleMenu.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.Icicle,
            this.ZoomableIcicle});
			this.IcicleMenu.Name = "IcicleMenu";
			this.IcicleMenu.Size = new System.Drawing.Size(46, 20);
			this.IcicleMenu.Text = "Icicle";
			// 
			// Icicle
			// 
			this.Icicle.Name = "Icicle";
			this.Icicle.Size = new System.Drawing.Size(158, 22);
			this.Icicle.Text = "Icicle";
			this.Icicle.Click += new System.EventHandler(this.Icicle_Click);
			// 
			// ZoomableIcicle
			// 
			this.ZoomableIcicle.Name = "ZoomableIcicle";
			this.ZoomableIcicle.Size = new System.Drawing.Size(158, 22);
			this.ZoomableIcicle.Text = "Zoomable Icicle";
			this.ZoomableIcicle.Click += new System.EventHandler(this.ZoomableIcicle_Click);
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(805, 112);
			this.Controls.Add(this.menuStrip1);
			this.MainMenuStrip = this.menuStrip1;
			this.Name = "Form1";
			this.Text = "Form1";
			this.Load += new System.EventHandler(this.Form1_Load);
			this.menuStrip1.ResumeLayout(false);
			this.menuStrip1.PerformLayout();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion
		private System.Windows.Forms.MenuStrip menuStrip1;
		private System.Windows.Forms.ToolStripMenuItem SunburstMenu;
		private System.Windows.Forms.ToolStripMenuItem Sunburst;
		private System.Windows.Forms.ToolStripMenuItem ZoomableSunburst;
		private System.Windows.Forms.ToolStripMenuItem LimitedSunburst;
		private System.Windows.Forms.ToolStripMenuItem IcicleMenu;
		private System.Windows.Forms.ToolStripMenuItem Icicle;
		private System.Windows.Forms.ToolStripMenuItem ZoomableIcicle;
	}
}

