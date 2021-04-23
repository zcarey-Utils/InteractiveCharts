using InteractiveCharts;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ChartTester {
	public partial class Form1 : Form {

		private Chart chart;

		public Form1() {
			InitializeComponent();
		}

		private void LoadChart<T>() where T : Chart, new() {
			if(chart != null) {
				ChartPanel.Controls.Remove(chart);
				chart = null;
			}

			chart = new T();
			chart.Dock = DockStyle.Fill;
			chart.Name = "Chart1";
			ChartPanel.Controls.Add(chart);
		}

		private void BetterSunburst_Click(object sender, EventArgs e) => LoadChart<BetterSunburst>();
		private void LimitedSunburst_Click(object sender, EventArgs e) => LoadChart<LimitedSunburst>();
		private void Sunburst_Click(object sender, EventArgs e) => LoadChart<Sunburst>();
		private void VasturianoSunburst_Click(object sender, EventArgs e) => LoadChart<VasturianoSunburst>();
		private void ZoomableSunburst_Click(object sender, EventArgs e) => LoadChart<ZoomableSunburst>();
	}
}
