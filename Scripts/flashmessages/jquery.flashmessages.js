/*!
 * jQuery FlashMessages for ASP.NET MVC
 * https://github.com/xaerosz/flashmessages
 *
 * Copyright 2015 Daniel Székely
 * Released under the MIT license
 */

(function ($) {

    var flashMessages = {};
    //Starting Id of a message
    flashMessages.Id = 1;
    //Centered flash message left margin, this should be changed if you change css margin
    flashMessages.centeredFlashMessageLeftMargin = '10px';
    //Centered flash message left position, this should be changed if you change css left position
    flashMessages.centeredFlashMessageLeft = '50%';
    //Default fade-out duration
    flashMessages.fadeOutDuration = 300;
    //Fixed and absolute message margin
    flashMessages.fixedMessagesMargin = 10;
    //When the document is ready, we check if there is some message in the cookie and create it
    //If you're using ASP.NET MVC, you can use FlashMessages.cs helper which is present in the package
    $(function () {
        GetMessageFromCookie();
    });
    function repositionFixedMessages() {
        $('.flash-message').each(function () {
            var topLeft = $(this).hasClass('top-left');
            var bottomLeft = $(this).hasClass('bottom-left');
            var topRight = $(this).hasClass('top-right');
            var bottomRight = $(this).hasClass('bottom-right');

            var top = topLeft || topRight;
            var positionClass;
            if (topLeft) {
                positionClass = ".top-left"
            }
            else if (bottomLeft) {
                positionClass = ".bottom-left"
            }
            else if (topRight) {
                positionClass = ".top-right"
            }
            else if (bottomRight) {
                positionClass = ".bottom-right"
            }
            else {
                positionClass = ".center"
            }

            var lastElement;
            if (positionClass == ".center") {
                $('.flash-message' + positionClass).each(function () {
                    if (lastElement != null) {
                        $(this).css('margin-top', parseInt($(lastElement).css('margin-top').replace('px', '')) + $(lastElement).outerHeight() + flashMessages.fixedMessagesMargin);
                    }
                    else {
                        $(this).css('margin-top', -($(this).outerHeight()/2));
                    }
                    lastElement = $(this);
                });
            }
            else
            {
                $('.flash-message' + positionClass).each(function () {
                    if (lastElement != null) {
                        $(this).css((top ? 'top' : 'bottom'), $(lastElement).outerHeight() + (top ? $(lastElement).position().top : $(window).height() - $(lastElement).position().top - $(lastElement).outerHeight()) + flashMessages.fixedMessagesMargin);
                    }
                    else {
                        $(this).css((top ? 'top' : 'bottom'), flashMessages.fixedMessagesMargin);
                    }
                    lastElement = $(this);
                });
            }
            
            lastElement = null;
        });

    }
    function GetMessageFromCookie() {
        //If jquery.cookie is used then continue
        if ($.cookie) {
            var cookie = $.cookie('FlashMessages');
            if (cookie != null) {
                var flashmessagesJson = JSON.parse(cookie);
                $.each(flashmessagesJson, function (index, value) {
                    //Creating flash message
                    $(value.container).createFlashMessage(value);
                });
            }
            //Deleting cookie
            $.cookie('FlashMessages', null, { path: '/' });
        }
    }
    $.fn.extend({
        getMessageFromCookie: function () {
            GetMessageFromCookie();
        },
        createFlashMessage: function (options) {
            //Default options
            var defaultOptions = {
                type: "info", //Types: info, success, fail
                message: "Message goes here.", //Message to be displayed
                permanent: false, //Defines if message stays visible or fade out
                duration: 2000, //Duration of message in miliseconds before fading out
                closeable: false, //Bool if message contains closing button
                position: "fixed", //CSS-like positions: fixed, static, absolute
                location: "center", //Location only for fixed and absolute messages: center, top-left, top-right, bottom-left, bottom-right
                additionalClasses: "", //Additional classes
                data: null //Additional data
            };
            //If some options are not set we'll fill it out from default options
            options = $.extend(defaultOptions, options);
            //If desired position is 'absolute' we need to set parent div to position 'relative'
            if (options.position == 'absolute') {
                $(this).css('position', 'relative');
            }
            //Fill where permanent message should be appended
            var contentWrapper = $(this).first();
            //Flash messages class
            var flashClass = "flash-message";
            //Unique id of flash message
            var flashId = flashClass + "-" + flashMessages.Id;
            //Creating the flash message itself
            var flashDiv = $("<div></div>", {
                "class": flashClass + " " + options.type + " " + options.position + " " + (options.permanent ? "permanent" : "") + " " + options.additionalClasses,
                'id': flashId
            });
            var textContainerDiv = $("<div></div>", {
                'class': "text-container",
                'html': options.message
            });


            flashDiv.append(textContainerDiv);
            //Filling the data attributes
            flashDiv.data(jQuery.parseJSON(options.data));
            //If the message is closeable we'll append delete button
            if (options.closeable) {
                flashDiv.append(
                    $("<div></div>", {
                        "class": "delete-flash-message",
                        text: "×"
                    })
                );
            }
            //Prepending the message to the container, prepending because we want the static message to be first in container
            $(this).prepend(flashDiv);
            if (flashDiv.hasClass('fixed') || flashDiv.hasClass('absolute')) {
                //If the message has fixed or absolute position we'll add a location class
                flashDiv.addClass(options.location);
                //Centering a message if it should be centered               
                if (options.location == "center") {
                    $(flashDiv).css({
                        'left': 0
                    });
                    $(flashDiv).css({
                        'margin-left': -flashDiv.outerWidth() / 2 + 'px',
                        'left': flashMessages.centeredFlashMessageLeft
                    });
                    $(flashDiv).css({
                        'margin-top': -flashDiv.outerHeight() / 2 + 'px'
                    });
                }
            }
            //In case that message is non-permanent fade it out
            if (!options.permanent) {
                //We have different transitions for static messages, it looks more fluent
                if (flashDiv.hasClass('static')) {
                    $(flashDiv).delay(options.duration).slideUp(flashMessages.fadeOutDuration, function () {
                        $(flashDiv).remove();
                    });
                }
                else {
                    $(flashDiv).delay(options.duration).fadeOut(flashMessages.fadeOutDuration, function () {
                        $(flashDiv).remove();
                        repositionFixedMessages();
                    });
                }
            }
            $('.delete-flash-message').click(function () {
                //We have different transitions for static messages, it looks more fluent
                if ($(this).parent().hasClass('static')) {
                    $(this).closest('.flash-message').stop(true).slideUp(flashMessages.fadeOutDuration, function () {
                        $(this).closest('.flash-message').remove();
                    });
                }
                else {
                    $(this).closest('.flash-message').stop(true).fadeOut(flashMessages.fadeOutDuration, function () {
                        $(this).closest('.flash-message').remove();
                        repositionFixedMessages();
                    });
                }
            });
            //Increment Id
            flashMessages.Id++;
            //reposition flashmessages
            repositionFixedMessages();
            //Return Id
            return flashId;
        },
        deleteFlashMessages: function (duration, type) {
            //Fadeout duration
            duration = duration === undefined ? flashMessages.fadeOutDuration : parseInt(duration);
            $(this).find('.flash-message' + (type == null ? '' : '.' + type)).each(function () {
                //We have different transitions for static messages, it looks more fluent
                if ($(this).hasClass('static')) {
                    $(this).stop(true).slideUp(duration, function () {
                        $(this).remove();
                    });
                }
                else {
                    $(this).stop(true).fadeOut(duration, function () {
                        $(this).remove();
                        repositionFixedMessages();
                    });
                }

            });
        },
        deleteFlashMessage: function (duration) {
            //Fadeout duration
            duration = duration === undefined ? flashMessages.fadeOutDuration : parseInt(duration);
            //We have different transitions for static messages, it looks more fluent
            if ($(this).hasClass('static')) {
                $(this).stop(true).slideUp(duration, function () {
                    $(this).remove();
                });
            }
            else {
                $(this).stop(true).fadeOut(duration, function () {
                    $(this).remove();
                    repositionFixedMessages();
                });
            }
        },
        reflowFlashMessages: function (type) {
            //There was little problem with keeping the centered messages centered while resizing because of this problem there is a function to recenter message
            $(this).find('.flash-message' + (type == null ? '' : '.' + type)).each(function () {
                if ($(this).hasClass('center')) {
                    $(this).css({
                        'margin-left': flashMessages.centeredFlashMessageLeftMargin,
                        'margin-top': 0
                    });
                    $(this).css({
                        'left': '0px'
                    });
                    $(this).css({
                        'margin-left': -$(this).outerWidth() / 2 + 'px',
                        'left': flashMessages.centeredFlashMessageLeft
                    });
                    $(this).css({
                        'margin-top': -$(this).outerHeight() / 2 + 'px'
                    });
                }
                repositionFixedMessages();
            });
        }
    });
})(jQuery);
