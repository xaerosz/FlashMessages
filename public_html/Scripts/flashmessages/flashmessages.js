/// Flashmessages for ASP.NET MVC
(function ($) {

    var flashMessages = {};
    flashMessages.Id = 1;
    flashMessages.centeredFlashMessageLeftMargin = '10px';
    flashMessages.centeredFlashMessageLeft = '50%';

    
    $(function () {
        var cookie = $.cookie('FlashMessage');
        if (cookie != null) {
            var array = cookie.split('[PARSESTRING]');
        }
        var options;
        var container; //Container where to append the message permanent message
        if (array != null) {
            container = array[6];
            options = {
                type: array[0],
                message: decodeURIComponent(array[1]),
                permanent: array[2] == 'True' ? true : false,
                duration: parseInt(array[3]),
                closeable: array[4] == 'True' ? true : false,
                position: array[5],
            }
        }
        if (cookie != null) {
            $(container).createFlashMessage(options);
        }
        $.cookie('FlashMessage', null, { path: '/' });        
    });

    $.fn.extend({
        //Default types: info, fail, success
        createFlashMessage: function (options)
        {
            var defaultOptions = {
                type: "info", //Types: info, success, fail (view flashmessages.css for more info)
                message: "Message goes here.", //Message to be displayed
                permanent: false, //Defines if message stays visible or fade out
                duration: 2000, //Duration of non-permanent message in miliseconds before fading-out
                closeable: false, //Bool if message contains closing button
                position: "center", //Positions only for non-permanent messages: center, top-left, top-right, bottom-left, bottom-right (view flashmessages.css for more info)
            }

            options = $.extend(defaultOptions, options);
            var fadeOutDuration = 300;

            //Fill where permanent message should be appended
            var contentWrapper = $(this).first();
            var flashClass = "flash-message";
            var flashId = flashClass + "-" + flashMessages.Id;
            var flashDiv = $("<div></div>", {
                "class": flashClass + " " + options.type,
                'id': flashId,
                text: options.message
            });

            flashDiv.addClass(options.type);
            if (options.closeable) {
                flashDiv.append(
                    $("<div></div>", {
                        "class": "delete-flash-message",
                        text: "×"
                    })
                )
            }
            contentWrapper.prepend(flashDiv);
            if (options.permanent) {
                flashDiv.addClass("permanent");
            }
            else
            {
                
                flashDiv.addClass(options.position);
                //center non-permanent centered message               
                if (options.position == "center") {
                    $(flashDiv).css({
                        'left': 0,
                    });
                    $(flashDiv).css({
                        'margin-left': -flashDiv.outerWidth() / 2 + 'px',
                        'left': flashMessages.centeredFlashMessageLeft,
                    });                    
                    $(flashDiv).css({
                        'margin-top': -flashDiv.outerHeight() / 2 + 'px',
                    });

                }
                //in case that message is non-permanent, remove it
                $(flashDiv).delay(options.duration).fadeOut(fadeOutDuration, function () {
                    $(flashDiv).remove();
                });
                
            }           

            $('.delete-flash-message').click(function () {
                var fadeOutDuration = 300;
                if ($(this).parent().hasClass('permanent')) {
                    $(this).closest('.flash-message').stop(true).slideUp(fadeOutDuration, function () {
                        $(this).closest('.flash-message').remove();
                    });
                }
                else {
                    $(this).closest('.flash-message').stop(true).fadeOut(fadeOutDuration, function () {
                        $(this).closest('.flash-message').remove();
                    });
                }
            });
            //increment id
            flashMessages.Id++;
            //return id
            return flashId;
        },
        deleteFlashMessages: function (duration, type) {
            duration = duration === undefined ? 0 : parseInt(duration);
            $(this).find('.flash-message' + (type == null ? '' : '.' + type)).each(function () {
                if ($(this).hasClass('permanent')) {
                    $(this).stop(true).slideUp(duration, function () {
                        $(this).remove();
                    });
                }
                else {
                    $(this).stop(true).fadeOut(duration, function () {
                        $(this).remove();
                    });
                }
                    
            });
        },
        deleteFlashMessage: function (duration) {            
            duration = duration === undefined ? 0 : parseInt(duration);
            if ($(this).hasClass('permanent')) {
                $(this).stop(true).slideUp(duration, function () {
                    $(this).remove();
                });
            }
            else {
                $(this).stop(true).fadeOut(duration, function () {
                    $(this).remove();
                });
            }
        },
        reflowFlashMessages: function (type) {
            $(this).find('.flash-message' + (type == null ? '' : '.' + type)).each(function () {
                if ($(this).hasClass('center')) {
                    $(this).css({
                        'margin-left': flashMessages.centeredFlashMessageLeftMargin,
                        'margin-top': 0 ,
                    });
                    $(this).css({
                        'left': '0px',
                    });
                    $(this).css({
                        'margin-left': -$(this).outerWidth() / 2 + 'px',
                        'left': flashMessages.centeredFlashMessageLeft,
                    });
                    $(this).css({
                        'margin-top': -$(this).outerHeight() / 2 + 'px',
                    });
                }
            });            
        }
    });
})(jQuery);
