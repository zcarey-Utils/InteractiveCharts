using InteractiveCharts.Data.Examples;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace ChartTester.Sunburst {
	public partial class LimitedSunburstForm : Form {
		public LimitedSunburstForm() {
			InitializeComponent();
			limitedSunburst1.Data = GroupedDataExample.Flare;
		}
	}
}
