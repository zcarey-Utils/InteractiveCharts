using JsonSerializable;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Data.GroupedData {
	public interface IGroupedData : IJsonSerializable {

		public string Name { get; }

		public int Value { get; }

		/// <summary>
		/// Prune any children that do not have a value assigned to them, and call this function in the other children.
		/// </summary>
		void PruneData();

	}
}
