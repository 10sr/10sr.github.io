var DMD = (function(){
    var div;

    function init(){
        // window.onload = onLoadHandler;
        // window.onhashchange = onHashChangeHandler;
        // or
        if (window.addEventListener) {
            window.addEventListener("load", onLoadHandler, false);
            window.addEventListener("hashchange", onHashChangeHandler, false);
        } else if (window.attatchEvent) {
            window.attatchEvent("onload", onLoadHandler);
            window.attatchEvent("onhashchange", onHashChangeHandler);
        }
    };

    function onLoadHandler(){
        div = window.document.getElementById("dmd-content");
        onHashChangeHandler();
    };

    function onHashChangeHandler(){
        var h = window.content.location.hash;
        // alert(h);
        if (h) {
            loadContent(h.substr(1) || "index");
        } else {
            loadContent("index");
        }
    }

    function loadContent(name){
        getContent(name + ".md", function(xhr){
            // content available when xhr.status === 0 ...??
            // alert(xhr.status);
            // alert(xhr.responseText);
            div.innerHTML = marked(xhr.responseText);
        });
    }

    function clearContent(){
        div.innerHTML = "";
    }

    function dirName(str){
        return str.replace(/[^/]*$/, "");
    }

    function getContent(name, callback){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", name, true);
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                callback(xhr);
            }
        };
        xhr.overrideMimeType('text/plain; charset=UTF-8');
        xhr.send(null);
    }

    return {
        init : init
    };
})();

DMD.init();
