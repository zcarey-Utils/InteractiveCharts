using JsonSerializable;
using System;
using System.Collections.Generic;
using System.Text;

namespace InteractiveCharts.Data.GroupedData {

	/// <summary>
	/// <para>
	/// Sunburst data works in a tree, where <see cref="GroupValue"/> contains the actual data amounts and <see cref="GroupCategory"/> groups the amounts together. <br></br>
	/// <br></br>.....Category
	/// <br></br>............../\
	/// <br></br>........../........\
	///	<br></br>..Category..Value
	/// <br></br>......./\  
	/// <br></br>.../........\
	/// <br></br>.Value..Value
	/// </para>
	/// </summary>
	public class GroupValue : IGroupedData {

		public int Value { get; set; }

	}
}
