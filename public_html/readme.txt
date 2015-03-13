How to include it into your project:
In helper FlashMessages.cs change namespace to your name of the project.
In flashmessages.js change where permanent message should be appended (default value = "body")

In your _layout.cshtml or in bundleconfig include:

<link rel="stylesheet" href="~/Scripts/flashmessages/flashmessages.css" type="text/css" media="screen" />
<script type="text/javascript" src="~/Scripts/flashmessages/flashmessages.js"></script>  
<script type="text/javascript" src="~/Scripts/flashmessages/jquery.cookie.js"></script>  

You can also call JS function CreateFlashMessage(type, message, permanent, duration) anywhere in the project.
It can be handy when you're using AJAX and/or the page is not reloaded to display the message.

Example of usage in controller:


    public class HomeController : Controller
    {
        private readonly FlashMessages _fm;

        public HomeController(FlashMessages fm)
        {
            this._fm = fm;
        }

        public ActionResult Index()
        {
            _fm.CreateFlashMessage("success", "Hello world!", true);
            return View();
        }
    }

Example of usage in JS:

CreateFlashMessage("fail", "Hello world! It Failed!", true, 10)



Feel free to use and spread it ;)

Daniel Székely - 2014