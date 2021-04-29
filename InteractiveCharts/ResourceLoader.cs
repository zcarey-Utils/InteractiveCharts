using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace InteractiveCharts {
	internal interface ResourceLoader {

		internal Stream LoadResource(string name);

	}
}
