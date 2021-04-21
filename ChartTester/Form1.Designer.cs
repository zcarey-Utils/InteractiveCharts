
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
			this.vasturianoSunburst1 = new InteractiveCharts.VasturianoSunburst();
			this.SuspendLayout();
			// 
			// vasturianoSunburst1
			// 
			this.vasturianoSunburst1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.vasturianoSunburst1.Dock = System.Windows.Forms.DockStyle.Fill;
			this.vasturianoSunburst1.Location = new System.Drawing.Point(0, 0);
			this.vasturianoSunburst1.Name = "vasturianoSunburst1";
			this.vasturianoSunburst1.Size = new System.Drawing.Size(1090, 739);
			this.vasturianoSunburst1.TabIndex = 0;
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(1090, 739);
			this.Controls.Add(this.vasturianoSunburst1);
			this.Name = "Form1";
			this.Text = "Form1";
			this.ResumeLayout(false);

		}

		#endregion

		private InteractiveCharts.VasturianoSunburst vasturianoSunburst1;
	}
}

