using InteractiveCharts.Data.GroupedData;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Sunburst {
	public class Sunburst : SunburstGraph {

		protected override string URL => "Sunburst/index.html";

		protected override string DesignModeName => "Sunburst";

		public Sunburst() : base() {
		}
	}
}
