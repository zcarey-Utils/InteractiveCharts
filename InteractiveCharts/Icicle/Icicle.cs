using InteractiveCharts.Data.GroupedData;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Icicle {
	public class Icicle : Chart {

		#region Properties
		public IGroupedData Data {
			get => resourceLoader.Data;
			set => resourceLoader.Data = value;
		}
		#endregion

		protected override string URL => "Icicle/index.html";
		protected override string DesignModeName => "Icicle";
		internal override ResourceLoader ResourceLoader => resourceLoader;
		private IcicleResourceLoader resourceLoader = new IcicleResourceLoader();

		public Icicle() : base() {
			resourceLoader.ID = this.ResourceLoaderID;
		}
	}
}
