
namespace ChartTester.Icicle {
	partial class IcicleForm {
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
			this.icicle1 = new InteractiveCharts.Icicle.Icicle();
			this.SuspendLayout();
			// 
			// icicle1
			// 
			this.icicle1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
			this.icicle1.Data = null;
			this.icicle1.Dock = System.Windows.Forms.DockStyle.Fill;
			this.icicle1.Location = new System.Drawing.Point(0, 0);
			this.icicle1.Name = "icicle1";
			this.icicle1.Size = new System.Drawing.Size(1101, 854);
			this.icicle1.TabIndex = 0;
			// 
			// IcicleForm
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(1101, 854);
			this.Controls.Add(this.icicle1);
			this.Name = "IcicleForm";
			this.Text = "IcicleForm";
			this.Load += new System.EventHandler(this.IcicleForm_Load);
			this.ResumeLayout(false);

		}

		#endregion

		private InteractiveCharts.Icicle.Icicle icicle1;
	}
}