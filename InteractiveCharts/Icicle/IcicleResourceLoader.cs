using InteractiveCharts.Data.GroupedData;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Icicle {
	internal class IcicleResourceLoader : ResourceLoader {

		internal new IGroupedData Data {
			get => (IGroupedData)base.Data;
			set => base.Data = value;
		}

		internal string TooltipTitle = null;
		internal string TooltipContent = null;

		protected override void LoadConfig(JavascriptWriter writer) {
			if (TooltipTitle != null) {
				writer.WriteFunction("tooltipTitle", TooltipTitle, "data", "d");
			}

			if (TooltipContent != null) {
				writer.WriteFunction("tooltipContent", TooltipContent, "data", "d");
			}
		}

	}
}
