using InteractiveCharts.Data.GroupedData;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Sunburst {
	public class Sunburst : Chart {

		#region Properties
		public IGroupedData Data {
			get => resourceLoader.Data;
			set => resourceLoader.Data = value;
		}
		#endregion

		protected override string URL => "Sunburst/index.html";

		protected override string DesignModeName => "Sunburst";

		internal override ResourceLoader ResourceLoader => resourceLoader;
		private SunburstResourceLoader resourceLoader = new SunburstResourceLoader();

		public Sunburst() : base() {
			resourceLoader.ID = this.ResourceLoaderID;
		}
	}
}
