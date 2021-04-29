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

		public string Name { get; set; }

		public int Value { get; set; }

		public GroupValue(string name, int value) {
			this.Name = name;
			this.Value = value;
		}

		public void PruneData() {
			//Nothing to do, there are no children to prune.
		}

		public JsonData SaveToJson() {
			JsonObject obj = new JsonObject();
			obj["name"] = (JsonString)(Name ?? "null");
			obj["value"] = (JsonInteger)Value;
			return obj;
		}

		public void LoadFromJson(JsonData Data) {
			throw new NotImplementedException();
		}

	}
}
