using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Text;

namespace InteractiveCharts {

	public class ZoomableSunburst : Chart {

		/// <summary>
		/// NOTE: This is Javascript code, thus the code is not checked for errors until runtime.
		/// </summary>
		[Editor(typeof(MultilineStringEditor), typeof(System.Drawing.Design.UITypeEditor))]
		public string TooltipContent { get; set; } = "return \"Size: \" + format(d.value);";

		protected override string URL => "ZoomableSunburst/index.html";

		protected override string DesignModeName => "Zoomable Sunburst";
	}
}
