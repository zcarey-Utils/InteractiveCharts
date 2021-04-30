using InteractiveCharts.Data.GroupedData;
using JsonSerializable;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace InteractiveCharts.Sunburst {
	internal class SunburstResourceLoader : ResourceLoader {

		internal IGroupedData Data { get; set; }

		internal int ID = 0;
		internal string TooltipContent = null;

		Stream ResourceLoader.LoadConfig() {
			MemoryStream stream = new MemoryStream();
			StreamWriter writer = new StreamWriter(stream);
			{
				writer.WriteLine("var id = \"" + ID.ToString() + "\";");

				if(TooltipContent != null) {
					writer.WriteLine("var tooltipContent = function (data, d) {");
					writer.WriteLine(TooltipContent);
					writer.WriteLine("};");
				}
			}
			writer.Flush();
			stream.Flush();
			stream.Position = 0;
			return stream;
		}

		Stream ResourceLoader.LoadResource(string name) {
			if (name == "flare.json") { //TODO change to Data.json
				MemoryStream stream = new MemoryStream();
				if (Data != null) {
					Json.Write(Data, stream);
					stream.Position = 0;
				}

				return stream;
			} else {
				return null;
			}
		}
	}
}
