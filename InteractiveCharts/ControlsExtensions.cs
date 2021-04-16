using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Forms;

namespace InteractiveCharts {
	public static class ControlsExtensions {

        /// <summary>
        /// Executes the Action asynchronously on the UI thread, does not block execution on the calling thread.
        /// </summary>
        /// <param name="control">the control for which the update is required</param>
        /// <param name="action">action to be performed on the control</param>
        public static void InvokeOnUiThreadIfRequired(this Control control, Action action) {
            //If you are planning on using a similar function in your own code then please be sure to
            //have a quick read over https://stackoverflow.com/questions/1874728/avoid-calling-invoke-when-the-control-is-disposed
            //No action
            if (control.Disposing || control.IsDisposed || !control.IsHandleCreated) {
                return;
            }

            if (control.InvokeRequired) {
                control.BeginInvoke(action);
            } else {
                action.Invoke();
            }
        }

        /// <summary>
        /// Extension method to return if the control is in design mode
        /// </summary>
        /// <param name="control">Control to examine</param>
        /// <returns>True if in design mode, otherwise false</returns>
        public static bool IsInDesignMode(this System.Windows.Forms.Control control) {
            return ResolveDesignMode(control);
        }

        /// <summary>
        /// Method to test if the control or it's parent is in design mode
        /// </summary>
        /// <param name="control">Control to examine</param>
        /// <returns>True if in design mode, otherwise false</returns>
        private static bool ResolveDesignMode(System.Windows.Forms.Control control) {
            System.Reflection.PropertyInfo designModeProperty;
            bool designMode;

            // Get the protected property
            designModeProperty = control.GetType().GetProperty(
                                    "DesignMode",
                                    System.Reflection.BindingFlags.Instance
                                    | System.Reflection.BindingFlags.NonPublic);

            // Get the controls DesignMode value
            designMode = (bool)designModeProperty.GetValue(control, null);

            // Test the parent if it exists
            if (control.Parent != null) {
                designMode |= ResolveDesignMode(control.Parent);
            }

            return designMode;
        }

    }
}
