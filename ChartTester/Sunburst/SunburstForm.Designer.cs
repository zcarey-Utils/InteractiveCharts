
namespace ChartTester.Sunburst {
	partial class SunburstForm {
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
			this.sunburst1 = new InteractiveCharts.Sunburst.Sunburst();
			this.SuspendLayout();
			// 
			// sunburst1
			// 
			this.sunburst1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.sunburst1.Dock = System.Windows.Forms.DockStyle.Fill;
			this.sunburst1.Location = new System.Drawing.Point(0, 0);
			this.sunburst1.Name = "sunburst1";
			this.sunburst1.Size = new System.Drawing.Size(1008, 870);
			this.sunburst1.TabIndex = 0;
			// 
			// SunburstForm
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(1008, 870);
			this.Controls.Add(this.sunburst1);
			this.Name = "SunburstForm";
			this.Text = "SunburstForm";
			this.ResumeLayout(false);

		}

		#endregion

		private InteractiveCharts.Sunburst.Sunburst sunburst1;
	}
}