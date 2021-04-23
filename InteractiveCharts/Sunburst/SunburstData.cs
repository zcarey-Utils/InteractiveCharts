using JsonSerializable;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Sunburst {

	/// <summary>
	/// Sunburst data works in a sort-of inverse tree, where SunburstData contains the actual data amounts, but
	///      Category
	///         /\
	///       /    \
	///	 Category  Data
	///     /\  
	///   /    \
	/// Data  Data
	/// </summary>
	public class SunburstData : IJsonSerializable {
	}
}
