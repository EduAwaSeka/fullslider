function initializeReveal() {
    // Full list of configuration options available at:
    // https://github.com/hakimel/reveal.js#configuration
    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        slideNumber: true,
        keyboard: true,
        touch: true,
        mouseWheel: true,
        transition: 'slide', // none/fade/slide/convex/concave/zoom

        // Optional reveal.js plugins
        dependencies: [
            {src: 'lib/js/classList.js', condition: function() {
                    return !document.body.classList;
                }},
            {src: 'plugin/markdown/marked.js', condition: function() {
                    return !!document.querySelector('[data-markdown]');
                }},
            {src: 'plugin/markdown/markdown.js', condition: function() {
                    return !!document.querySelector('[data-markdown]');
                }},
            {src: 'plugin/highlight/highlight.js', async: true, condition: function() {
                    return !!document.querySelector('pre code');
                }, callback: function() {
                    hljs.initHighlightingOnLoad();
                }},
            {src: 'plugin/zoom-js/zoom.js', async: true},
            {src: 'plugin/notes/notes.js', async: true}
        ]
    });
}

function cleanBase64Params(param) {
    param = param.replace(/ /g, '+');
    param = param.replace(/=/g, '');
    return param;
}

function exitFullscreen() {

    var element = document.body;

    // Check which implementation is available
    var requestMethod = element.cancelFullScreen ||
            element.webkitCancelFullscreen ||
            element.webkitCancelFullScreen ||
            element.mozCancelFullScreen ||
            element.msCancelFullscreen;

    if (requestMethod) {
        requestMethod.apply(element);
    }
}

function toggleFullScreen() {
    var elem = document.body;
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

if (sessionStorage.preview) { //View presentation
    document.getElementById("slides").innerHTML = sessionStorage.preview;
    document.title = sessionStorage.title;
    $(document).ready(function(){
        initializeReveal();
    });
}
//else { //PDF
//    var params = purl(window.location.href).param();
//    if (params.slides) {
//        document.getElementById("slides").innerHTML = document.getElementById("slides").innerHTML + atob(cleanBase64Params(params.slides));
//    }
//}