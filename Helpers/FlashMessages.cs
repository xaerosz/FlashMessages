using System;
using System.Web;
using System.Web.Script.Serialization;

namespace YourProjectNamespace.Helpers
{
    public static class FlashMessages
    {

        ///<summary>
        /// jQuery FlashMessages for ASP.NET MVC
        /// https://github.com/xaerosz/flashmessages
        ///
        /// Copyright 2015 Daniel Székely
        /// Released under the MIT license 
        /// </summary>
        /// <param name="type">Types: info, success, fail</param>
        /// <param name="message">Message to be displayed</param>
        /// <param name="permanent">Defines if message stays visible or fade out</param>
        /// <param name="duration">Duration of message in miliseconds before fading out</param>
        /// <param name="closeable">Bool if message contains closing button</param>
        /// <param name="position">CSS-like positions: fixed, static, absolute</param>
        /// <param name="location">Location only for fixed and absolute messages: center, top-left, top-right, bottom-left, bottom-right</param>
        /// <param name="container">Container where the message is appended</param>
        /// <param name="additionalClasses">Additional classes</param>
        /// <param name="data">Additional data</param>
        public static void CreateFlashMessage(string type = "info", string message = "Message goes here.", bool permanent = false, int duration = 2000, bool closeable = false, string position = "fixed", string location = "center", string container = "body", string additionalClasses = "", object data = null)
        {
            message = Uri.EscapeUriString(message);
            HttpCookie cookie = new HttpCookie("FlashMessage", type + "[PARSESTRING]" + message + "[PARSESTRING]" + permanent + "[PARSESTRING]" + duration + "[PARSESTRING]" + closeable + "[PARSESTRING]" + position + "[PARSESTRING]" + location + "[PARSESTRING]" + container + "[PARSESTRING]" + additionalClasses + "[PARSESTRING]" + new JavaScriptSerializer().Serialize(data));
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}