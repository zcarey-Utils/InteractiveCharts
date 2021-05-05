using InteractiveCharts.Data.GroupedData;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Icicle {
	public class ZoomableIcicle : Chart {

		#region Properties
		public IGroupedData Data {
			get => resourceLoader.Data;
			set => resourceLoader.Data = value;
		}
		#endregion

		protected override string URL => "ZoomableIcicle/index.html";

		protected override string DesignModeName => "Zoomable Icicle";

		internal override ResourceLoader ResourceLoader => resourceLoader;
		private IcicleResourceLoader resourceLoader = new IcicleResourceLoader();

		public ZoomableIcicle() : base() {
			resourceLoader.ID = this.ResourceLoaderID;
		}

	}
}
