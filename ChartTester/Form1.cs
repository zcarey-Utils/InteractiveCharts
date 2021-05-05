using ChartTester.Sunburst;
using ChartTester.Icicle;
using InteractiveCharts;
using InteractiveCharts.Data.Examples;
using InteractiveCharts.Sunburst;
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

		public Form1() {
			InitializeComponent();
		}

		private void Form1_Load(object sender, EventArgs e) {

		}

		private void LoadChart<T>() where T : Form, new() {
			T form = new T();
			form.Show();
		}

		private void LimitedSunburst_Click(object sender, EventArgs e) => LoadChart<LimitedSunburstForm>();
		private void Sunburst_Click(object sender, EventArgs e) => LoadChart<SunburstForm>();
		private void ZoomableSunburst_Click(object sender, EventArgs e) => LoadChart<ZoomableSunburstForm>();
		private void Icicle_Click(object sender, EventArgs e) => LoadChart<IcicleForm>();
		private void ZoomableIcicle_Click(object sender, EventArgs e) => LoadChart<ZoomableIcicleForm>();
	}
}
