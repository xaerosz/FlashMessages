using System;
using System.Web;

namespace FlashMessages.Helpers
{
    public static class FlashMessages
    {
        /// <summary>
        /// Flashmessages for ASP.NET MVC
        /// Created by Daniel Szekely in 2014
        /// </summary>
        /// <param name="type">Types: info, success, fail (view flashmessages.css for more info)</param>
        /// <param name="message">Message to be displayed</param>
        /// <param name="permanent">Defines if message stays visible or fade out</param>
        /// <param name="duration">Duration of non-permanent message in miliseconds before fading-out</param>
        /// <param name="closeable">Bool if message contains closing button</param>
        /// <param name="position">Positions only for non-permanent messages: center, top-left, top-right, bottom-left, bottom-right (view flashmessages.css for more info)</param>
        /// <param name="container">Container where to append the message permanent message</param>
        public static void CreateFlashMessage(string type = "info", string message = "Message goes here.", bool permanent = false, int duration = 2000, bool closeable = false, string position = "center", string container = "body")
        {
            message = Uri.EscapeUriString(message);
            HttpCookie cookie = new HttpCookie("FlashMessage", type + "[PARSESTRING]" + message + "[PARSESTRING]" + permanent + "[PARSESTRING]" + duration + "[PARSESTRING]" + closeable + "[PARSESTRING]" + position + "[PARSESTRING]" + container);
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}