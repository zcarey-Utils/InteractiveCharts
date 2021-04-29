using JsonSerializable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace InteractiveCharts.Data.GroupedData {

	/// <inheritdoc cref="GroupValue"/>
	public class GroupCategory : IGroupedData {

		private List<IGroupedData> elements = new List<IGroupedData>();

		public string Name { get; set; }
		public int Value => elements.Sum(x => x.Value);

		public GroupCategory(string name) {
			this.Name = name;
		}

		public GroupCategory(string name, params IGroupedData[] data) {
			this.Name = name;
			elements.AddRange(data);
		}

		public void PruneData() {
			List<IGroupedData> pruning = new List<IGroupedData>();
			foreach(IGroupedData element in elements) {
				element.PruneData();
				if(element.Value <= 0) {
					pruning.Add(element);
				}
			}
			foreach(IGroupedData prune in pruning) {
				elements.Remove(prune);
			}
		}

		public JsonData SaveToJson() {
			JsonObject group = new JsonObject();
			group["name"] = (JsonString)(Name ?? "null");

			JsonArray children = new JsonArray();
			foreach(IGroupedData element in elements) {
				children.Add(element.SaveToJson());
			}
			group["children"] = children;

			return group;
		}

		public void LoadFromJson(JsonData Data) {
			throw new NotImplementedException();
		}
	}
}
