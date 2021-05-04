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

		internal Stream LoadData() {
			MemoryStream stream = new MemoryStream();
			if (Data != null) {
				Json.Write(Data, stream);
				stream.Flush();
				stream.Position = 0;
			}

			return stream;
		}

		internal Stream LoadResource(string name) {
			return null;
		}

	}
}
