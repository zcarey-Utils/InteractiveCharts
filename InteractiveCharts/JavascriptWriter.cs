using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace InteractiveCharts {
	internal class JavascriptWriter {

		private readonly StreamWriter writer;

		internal JavascriptWriter(Stream stream) {
			writer = new StreamWriter(stream);
		}

		internal void Flush() {
			writer.Flush();
		}

		internal void WriteVariable(string name, string value) {
			if (name == null || value == null) throw new ArgumentNullException();
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = \"");
			writer.Write(value
				.Replace("\"", "\\\"")
				.Replace("\'", "\\\'")
				.Replace("\\", "\\\\")
				.Replace("\b", "\\b")
				.Replace("\f", "\\f")
				.Replace("\n", "\\n")
				.Replace("\r", "\\r")
				.Replace("\t", "\\t")
				.Replace("\v", "\\v")
			);
			writer.WriteLine("\";");
		}

		internal void WriteVariable(string name, bool value) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = ");
			writer.Write(value ? "true" : "false");
			writer.WriteLine(";");
		}

		internal void WriteVariable(string name, char value) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = \"");
			writer.Write(value);
			writer.WriteLine("\";");
		}

		internal void WriteVariable(string name, decimal value) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = ");
			writer.Write(value);
			writer.WriteLine(";");
		}

		internal void WriteVariable(string name, double value) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = ");
			writer.Write(value);
			writer.WriteLine(";");
		}

		internal void WriteVariable(string name, float value) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = ");
			writer.Write(value);
			writer.WriteLine(";");
		}

		internal void WriteVariable(string name, int value) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = ");
			writer.Write(value);
			writer.WriteLine(";");
		}

		internal void WriteVariable(string name, long value) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = ");
			writer.Write(value);
			writer.WriteLine(";");
		}

		internal void WriteVariable(string name, uint value) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = ");
			writer.Write(value);
			writer.WriteLine(";");
		}

		internal void WriteVariable(string name, ulong value) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = ");
			writer.Write(value);
			writer.WriteLine(";");
		}

		internal void WriteFunction(string name, string body, params string[] args) {
			writer.Write("var ");
			writer.Write(name);
			writer.Write(" = function (");
			writer.Write(string.Join(", ", args));
			writer.WriteLine(") {");
			writer.WriteLine(body);
			writer.WriteLine("};");
		}

	}
}
