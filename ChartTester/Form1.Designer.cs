
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
			this.vasturiano1 = new InteractiveCharts.Vasturiano();
			this.SuspendLayout();
			// 
			// vasturiano1
			// 
			this.vasturiano1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.vasturiano1.Dock = System.Windows.Forms.DockStyle.Fill;
			this.vasturiano1.Location = new System.Drawing.Point(0, 0);
			this.vasturiano1.Name = "vasturiano1";
			this.vasturiano1.Size = new System.Drawing.Size(992, 726);
			this.vasturiano1.TabIndex = 0;
			// 
			// Form1
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(992, 726);
			this.Controls.Add(this.vasturiano1);
			this.Name = "Form1";
			this.Text = "Form1";
			this.ResumeLayout(false);

		}

		#endregion

		private InteractiveCharts.Vasturiano vasturiano1;
	}
}

