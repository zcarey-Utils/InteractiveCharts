using InteractiveCharts.Data.Examples;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace ChartTester.Sunburst {
	public partial class ZoomableSunburstForm : Form {
		public ZoomableSunburstForm() {
			InitializeComponent();
			zoomableSunburst1.Data = GroupedDataExample.Flare;
		}

		private void ZoomableSunburstForm_Load(object sender, EventArgs e) {

		}
	}
}
