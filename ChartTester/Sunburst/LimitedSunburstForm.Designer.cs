
namespace ChartTester.Sunburst {
	partial class LimitedSunburstForm {
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
			this.limitedSunburst1 = new InteractiveCharts.Sunburst.LimitedSunburst();
			this.SuspendLayout();
			// 
			// limitedSunburst1
			// 
			this.limitedSunburst1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.limitedSunburst1.Dock = System.Windows.Forms.DockStyle.Fill;
			this.limitedSunburst1.Location = new System.Drawing.Point(0, 0);
			this.limitedSunburst1.Name = "limitedSunburst1";
			this.limitedSunburst1.Size = new System.Drawing.Size(991, 865);
			this.limitedSunburst1.TabIndex = 0;
			// 
			// LimitedSunburstForm
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(991, 865);
			this.Controls.Add(this.limitedSunburst1);
			this.Name = "LimitedSunburstForm";
			this.Text = "LimitedSunburstForm";
			this.ResumeLayout(false);

		}

		#endregion

		private InteractiveCharts.Sunburst.LimitedSunburst limitedSunburst1;
	}
}