using InteractiveCharts.Data.GroupedData;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Sunburst {
	public class LimitedSunburst : SunburstGraph {

		protected override string URL => "LimitedSunburst/index.html";
		protected override string DesignModeName => "Limited Sunburst";

		public LimitedSunburst() : base() {
		}
	}
}
