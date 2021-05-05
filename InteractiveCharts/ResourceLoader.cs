using JsonSerializable;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace InteractiveCharts {
	internal abstract class ResourceLoader {

		protected IJsonSerializable Data { get; set; }
		internal int ID = 0;

		internal Stream LoadConfig() {
			MemoryStream stream = new MemoryStream();
			JavascriptWriter writer = new JavascriptWriter(stream);
			writer.WriteVariable("id", ID);
			LoadConfig(writer);
			writer.Flush();
			stream.Flush();
			stream.Position = 0;

			return stream;
		}

		protected abstract void LoadConfig(JavascriptWriter writer);

		//TODO Uncaught TypeError: Cannot read property 'length' of undefined:
		//localfolder://cefsharp/ZoomableSunburst/zoomableSunburst.js at Line 13
		// (when data is null)
		internal Stream LoadData() {
			MemoryStream stream = new MemoryStream();
			if (Data != null) {
				Json.Write(Data, stream);	
			} else {
				JsonObject empty = new JsonObject();
				empty["name"] = (JsonString)"null";
				empty["value"] = (JsonInteger)1L;
				Json.Write(empty, stream);
			}
			stream.Flush();
			stream.Position = 0;

			return stream;
		}

		internal Stream LoadResource(string name) {
			return null;
		}

	}
}
