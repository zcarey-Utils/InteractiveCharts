using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace InteractiveCharts {
	internal interface ResourceLoader {

		internal Stream LoadConfig();

		internal Stream LoadResource(string name);

	}
}
