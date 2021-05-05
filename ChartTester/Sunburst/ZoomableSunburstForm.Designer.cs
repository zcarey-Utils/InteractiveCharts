
namespace ChartTester.Sunburst {
	partial class ZoomableSunburstForm {
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
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
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			this.zoomableSunburst1 = new InteractiveCharts.Sunburst.ZoomableSunburst();
			this.SuspendLayout();
			// 
			// zoomableSunburst1
			// 
			this.zoomableSunburst1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.zoomableSunburst1.Data = null;
			this.zoomableSunburst1.Dock = System.Windows.Forms.DockStyle.Fill;
			this.zoomableSunburst1.Location = new System.Drawing.Point(0, 0);
			this.zoomableSunburst1.Name = "zoomableSunburst1";
			this.zoomableSunburst1.Size = new System.Drawing.Size(1026, 880);
			this.zoomableSunburst1.TabIndex = 0;
			this.zoomableSunburst1.TooltipContent = "return \"Area: \" + format(d.value);";
			this.zoomableSunburst1.TooltipTitle = "var excludeRoot = false;\r\nreturn getNodeStack(d).slice(excludeRoot ? 1 : 0).map(f" +
    "unction(d) {\r\nreturn d.data.name;\r\n}).join(\' &rarr; \');";
			// 
			// ZoomableSunburstForm
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(1026, 880);
			this.Controls.Add(this.zoomableSunburst1);
			this.Name = "ZoomableSunburstForm";
			this.Text = "ZoomableSunburstForm";
			this.Load += new System.EventHandler(this.ZoomableSunburstForm_Load);
			this.ResumeLayout(false);

		}

		#endregion

		private InteractiveCharts.Sunburst.ZoomableSunburst zoomableSunburst1;
	}
}