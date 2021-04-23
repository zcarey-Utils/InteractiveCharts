using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Text;

namespace InteractiveCharts {

	public class BetterSunburst : Chart {

		/// <summary>
		/// NOTE: This is Javascript code, thus the code is not checked for errors until runtime.
		/// </summary>
		[Editor(typeof(MultilineStringEditor), typeof(System.Drawing.Design.UITypeEditor))]
		public string TooltipContent { get; set; } = "return \"Size: \" + format(d.value);";

		protected override string URL => "BetterSunburst/index.html";

		protected override string DesignModeName => "Better Sunburst";
	}
}
