using InteractiveCharts.Data.GroupedData;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Text;

namespace InteractiveCharts.Sunburst {
	public abstract class SunburstGraph : Chart {

		#region Properties
		public IGroupedData Data {
			get => resourceLoader.Data;
			set => resourceLoader.Data = value;
		}

		/// <summary>
		/// NOTE: This is Javascript code, thus the code is not checked for errors until runtime.
		/// </summary>
		[Editor(typeof(MultilineStringEditor), typeof(System.Drawing.Design.UITypeEditor))]
		public string TooltipTitle {
			get => resourceLoader.TooltipTitle;
			set => resourceLoader.TooltipTitle = value;
		}

		/// <summary>
		/// NOTE: This is Javascript code, thus the code is not checked for errors until runtime.
		/// </summary>
		[Editor(typeof(MultilineStringEditor), typeof(System.Drawing.Design.UITypeEditor))]
		public string TooltipContent {
			get => resourceLoader.TooltipContent;
			set => resourceLoader.TooltipContent = value;
		}
		#endregion

		internal override ResourceLoader ResourceLoader => resourceLoader;

		internal SunburstResourceLoader resourceLoader = new SunburstResourceLoader(); //TODO I wanted this to be protected but it caused problems and I am lazy right now. Sorry.

		protected SunburstGraph() : base() {
			resourceLoader.ID = base.ResourceLoaderID;
			this.TooltipTitle = "var excludeRoot = false;"
				+ "\nreturn getNodeStack(d).slice(excludeRoot ? 1 : 0).map(function(d) {"
				+ "\nreturn d.data.name;"
				+ "\n}).join(\' &rarr; \');";
			this.TooltipContent = "return \"Size: \" + format(d.value);";
		}

	}
}
