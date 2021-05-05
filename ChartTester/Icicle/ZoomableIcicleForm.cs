using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace ChartTester.Icicle {
	public partial class ZoomableIcicleForm : Form {
		public ZoomableIcicleForm() {
			InitializeComponent();
			zoomableIcicle1.Data = InteractiveCharts.Data.Examples.GroupedDataExample.Flare;
		}

		private void ZoomableIcicleForm_Load(object sender, EventArgs e) {

		}
	}
}
