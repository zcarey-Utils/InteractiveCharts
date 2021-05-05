using InteractiveCharts.Data.GroupedData;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Sunburst {
	public class LimitedSunburst : Chart {

		#region Properties
		public IGroupedData Data {
			get => resourceLoader.Data;
			set => resourceLoader.Data = value;
		}
		#endregion

		protected override string URL => "LimitedSunburst/index.html";
		protected override string DesignModeName => "Limited Sunburst";
		internal override ResourceLoader ResourceLoader => resourceLoader;
		private SunburstResourceLoader resourceLoader = new SunburstResourceLoader();

		public LimitedSunburst() : base() {
			resourceLoader.ID = this.ResourceLoaderID;
		}
	}
}
