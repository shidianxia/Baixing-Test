var Event = function () {
    this.attach = function (evtName, element, listener, capture) {
        var evt         = '',
            useCapture  = (capture === undefined) ? true : capture,
            handler     = null;

        if (window.addEventListener === undefined) {
            evt = 'on' + evtName;
            handler = function (evt, listener) {
                element.attachEvent(evt, listener);
                return listener;
            };
        } else {
            evt = evtName;
            handler = function (evt, listener, useCapture) {
                element.addEventListener(evt, listener, useCapture);
                return listener;
            };
        }

        return handler.apply(element, [evt, function (ev) {
            var e   = ev || event,
                src = e.srcElement || e.target;

            listener(e, src);
        }, useCapture]);
    };

    this.detach = function (evtName, element, listener, capture) {
        var evt         = '',
            useCapture  = (capture === undefined) ? true : capture;

        if (window.removeEventListener === undefined) {
            evt = 'on' + evtName;
            element.detachEvent(evt, listener);
        } else {
            evt = evtName;
            element.removeEventListener(evt, listener, useCapture);
        }
    };

    this.stop = function (evt) {
        evt.cancelBubble = true;

        if (evt.stopPropagation) {
            evt.stopPropagation();
        }
    };

    this.prevent = function (evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    };
};
/* --------------------------邪恶的分割线--------------------------- */
var click               = document.getElementById('click'),
    multipleEvents      = document.getElementById('multiple-events'),
    multipleListeners   = document.getElementById('multiple-listeners'),
    noevent             = document.getElementById('no-event'),
    input               = document.getElementById('prevent-click'),
    once                = document.getElementById('once'),
    upper               = document.getElementById('upper'),
    lower               = document.getElementById('lower'),
    evt                 = new Event(),
    message             = function (e, src) {
        window.alert(e.type + ' event on "' + src.id + '"');
    },
    messageHTML         = function (e, src) {
        var infoElement = document.getElementById(src.id + '-info');
        infoElement.innerHTML += '<div>' + e.type + ' event on "' + src.id + '"</div>';
        infoElement.scrollTop = infoElement.scrollHeight;
    },
    messageMulti        = function (e, src, lName) {
        var infoElement = document.getElementById(src.id + '-info');
        infoElement.innerHTML += '<div>' + e.type + ' event on "'
                                + src.id + ' with "' + lName + '"</div>';
        infoElement.scrollTop = infoElement.scrollHeight;
    };

evt.attach('click', document.getElementById('click'), message, false);

evt.attach('mouseover', multipleEvents, messageHTML);
evt.attach('mouseout', multipleEvents, messageHTML);
evt.attach('mousedown', multipleEvents, messageHTML);
evt.attach('mouseup', multipleEvents, messageHTML);

var noeventHandler = evt.attach('mousedown', noevent, message);
evt.detach('mousedown', noevent, noeventHandler);

var onceHandler = evt.attach('mousedown', once, function (e, src) {
    messageHTML(e, src);
    evt.detach('mousedown', once, onceHandler);
});

evt.attach('click', multipleListeners, function (e, src) {
    messageMulti(e, src, 'listener 1');
});

evt.attach('click', multipleListeners, function (e, src) {
    messageMulti(e, src, 'listener 2');
});

evt.attach('click', multipleListeners, function (e, src) {
    messageMulti(e, src, 'listener 3');
});

evt.attach('keypress', input, function (e) {
    evt.prevent(e);
});

evt.attach('mousedown', upper, function (e, src) {
    evt.stop(e);
    alert(src.id);
});
