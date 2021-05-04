﻿using InteractiveCharts.Data.GroupedData;
using JsonSerializable;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace InteractiveCharts.Sunburst {
	internal class SunburstResourceLoader : ResourceLoader {

		internal new IGroupedData Data { 
			get => (IGroupedData)base.Data; 
			set => base.Data = value; 
		}

		internal string TooltipContent = null;

		protected override void LoadConfig(JavascriptWriter writer) {
			if (TooltipContent != null) {
				writer.WriteFunction("tooltipContent", TooltipContent, "data", "d");
			}
		}

	}
}
