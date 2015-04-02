# FlashMessages
Great pop-up messages for your web project using jQuery. You can even create "FlashMessage" from your ASP.NET MVC Controller using jquery.cookie.js and included helper. 
![FlashMessages](http://jquery-flashmessages.wz.cz/flashmessages.jpg)

For live demo click [here](http://jquery-flashmessages.wz.cz/demo.html "Live demo")

## JQuery usage
```javascript
var flashMessageId = $('body').createFlashMessage({
    type: "fm-info", //Types: fm-info, fm-success, fm-fail
    message: "Message goes here.", //Message to be displayed
    permanent: false, //Defines if message stays visible or fade out
    duration: 2000, //Duration of message in miliseconds before fading out
    closeable: false, //Bool if message contains closing button
    position: "fm-fixed", //CSS-like positions: fm-fixed, fm-static, fm-absolute
    location: "fm-center", //Location only for fixed and absolute messages: fm-center, fm-top-left, fm-top-right, bottom-left, fm-bottom-right
    additionalClasses: "my-message", //Additional classes
    data: {myData: "some data"} //Additional data
});

console.log(flashMessageId); //output: flash-message-1

$('body').deleteFlashMessages(300, 'fm-success'); //Deletes all flash messages of type 'fm-success', fadeOut/slideUp duration will be 300ms
$('body').deleteFlashMessages(300); //Deletes all flash messages of all types, fadeOut/slideUp duration will be 300ms
$('body').deleteFlashMessages(); //Deletes all flash messages of all types, fadeOut/slideUp duration will be 0ms
$('.flash-message').last().deleteFlashMessage(300); //Deletes last flash message in DOM, fadeOut/slideUp duration will be 300ms
$('#flash-message-1').deleteFlashMessage(); //Deletes flash message with id: flash-message-1, fadeOut/slideUp duration will be 0ms

$(window).resize(function () {
  $(document).reflowFlashMessages('fm-success'); //This makes sure that centered non-permanent flash messages of type 'fm-success' retains correct centering
  $(document).reflowFlashMessages(); //This makes sure that centered non-permanent flash messages of all types retains correct centering
});

```
## C# usage
#####Important: Define your project's namespace in Helpers\FlashMessages.cs
```c#
using YourProjectNamespace.Helpers;

namespace YourProjectNamespace.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //Creates fm-success, static, permanent and closeable flash message in container with class 'content-wrapper' 
            FlashMessages.CreateFlashMessage(type: "fm-success", message: "Hello world! It succeeded!", permanent: true, closeable: true, position: "fm-static", container: ".content-wrapper");

            return View();
        }
        
        public ActionResult Detail()
        {
            //Creates fm-fail, non-permanent, fixed and non-closeable flash message in the bottom right corner of the page which will fade out in 2000ms containing data attribute 'myData' with value 'some data' and class 'my-message'  
            FlashMessages.CreateFlashMessage("fm-fail", "Hello world! It failed!", false, 2000, false, "fm-fixed", "fm-bottom-right", "body", "my-message", new { myData = "some data"});

            return View();
        }
    }
}
```
##Instalation
FlashMessages plugin is using JQuery and jquery-cookie

Everything you need is to include files below
```html  
<link rel="stylesheet" href="Scripts/flashmessages/flashmessages.css" type="text/css"/>
<script type="text/javascript" src="Scripts/flashmessages/jquery-2.1.0.js"></script>  
<script type="text/javascript" src="Scripts/flashmessages/jquery.cookie.js"></script> 
<script type="text/javascript" src="Scripts/flashmessages/flashmessages.js"></script>
```    
If you want to use ASP.NET MVC part of the FlashMessages you need to copy \Helpers\FlashMessages.cs to your project and include its namespace in your controller

```c#
using YourProjectNamespace.Helpers;
```

##Credits
Created by Daniel Székely

Thanks to my very good friend and co-worker Vladimír Podlešák for helping me with some problems along the way.

Feel free to spread it and modify it as you need.
