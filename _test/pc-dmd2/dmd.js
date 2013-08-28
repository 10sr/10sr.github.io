var DMD = (function(){
    var div_content;
    var div_menu;
    var pages_md = {};

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
        div_content = window.document.getElementById("dmd-content");
        div_menu = window.document.getElementById("dmd-menu");

        var pages = div_content.getElementsByClassName("dmd-page");
        for (var i = 0; i < pages.length; i++) {
            var name = pages[i].getAttribute("title");

            pages_md[name] = pages[i].innerHTML;

            var linode = window.document.createElement("li");
            var anode = window.document.createElement("a");
            anode.setAttribute("href", "#" + name);
            anode.innerHTML = name;
            linode.appendChild(anode);
            div_menu.appendChild(linode);
            div_menu.appendChild(window.document.createTextNode("\n"));
        }

        // div_content.innerHTML = "";
        while (div_content.hasChildNodes()) {
            div_content.removeChild(div_content.lastChild);
        }

        onHashChangeHandler();
    };

    function onHashChangeHandler(){
        var h = window.content.location.hash;
        // alert(h);
        if (h) {
            loadContent(h.substr(1) || "");
        } else {
            loadContent("");
        }
    }

    function loadContent(name){
        if (name) {
            div_content.innerHTML = marked(pages_md[name] || "");
        } else {
            clearContent();
        }
        // getContent(name + ".md", function(xhr){
        //     // content available when xhr.status === 0 ...??
        //     // alert(xhr.status);
        //     // alert(xhr.responseText);
        //     div_content.innerHTML = marked(xhr.responseText);
        // });
    }

    function clearContent(){
        div_content.innerHTML = "";
    }

    function dirName(str){
        return str.replace(/[^/]*$/, "");
    }

    // function getContent(name, callback){
    //     var xhr = new XMLHttpRequest();
    //     xhr.open("GET", name, true);
    //     xhr.onreadystatechange = function(){
    //         if (xhr.readyState === 4) {
    //             callback(xhr);
    //         }
    //     };
    //     xhr.overrideMimeType('text/plain; charset=UTF-8');
    //     xhr.send(null);
    // }

    return {
        init : init
    };
})();

DMD.init();
