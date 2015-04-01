using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Script.Serialization;

namespace FitLog.Helpers
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
            
            var messages = new List<object>();

            JavaScriptSerializer js = new JavaScriptSerializer();

            HttpCookie messagesCookie = HttpContext.Current.Response.Cookies.Get("FlashMessages");
            if (!string.IsNullOrWhiteSpace(messagesCookie.Value))
            {
                messages = (List<object>)js.Deserialize(messagesCookie.Value, typeof(List<object>));
            }

            messages.Add(new { 
                type = type, 
                message = message, 
                permanent = permanent, 
                duration = duration, 
                closeable = closeable, 
                position = position, 
                location = location, 
                container = container, 
                additionalClasses = additionalClasses,
                data = js.Serialize(data)
            });

            HttpCookie cookie = new HttpCookie("FlashMessages", js.Serialize(messages));
            HttpContext.Current.Response.Cookies.Set(cookie);
        }
    }
}