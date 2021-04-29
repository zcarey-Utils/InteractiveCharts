using InteractiveCharts.Data.GroupedData;
using JsonSerializable;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace InteractiveCharts.Sunburst {
	internal class SunburstResourceLoader : ResourceLoader {

		internal IGroupedData Data { get; set; }

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
