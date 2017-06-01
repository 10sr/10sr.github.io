var Render = (function(){
    var URL = null;
    var DIV_ID = null;

    function init(opts){
        URL = opts.url;
        DIV_ID = opts.div_id;

        if (!(URL && DIV_ID)) {
            console.log("Aborting: URL and/or DIV_ID not given");
            return;
        }

        if (window.addEventListener) {
            window.addEventListener("load", onLoadListener, false);
        } else if (window.attatchEvent) {
            window.attatchEvent("onload", onLoadListener);
        }
        return;
    }

    function onLoadListener(){
        var div_content = window.document.getElementById(DIV_ID);
        if (! div_content) { return; }

        while (div_content.hasChildNodes()) {
            div_content.removeChild(div_content.lastChild);
        }

        fetchContent(URL, function(responseText){
            div_content.innerHTML = marked(responseText);
        });
        return;
    }

    function fetchContent(url, callback){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                callback(xhr.responseText);
            }
        };
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain; charset=UTF-8');
        }
        xhr.send(null);
        return;
    }

    return {
        init: init
    };
})();
