/**
 * render.js - Render HTML content from Markdown string
 * License: http://unlicense.org/
 */


var Render = (function(){
    var INPUT_ID = null;
    var OUTPUT_ID = null;

    function init(opts){
        INPUT_ID = opts.inputId;
        OUTPUT_ID = opts.outputId;

        if (!(INPUT_ID && OUTPUT_ID)) {
            console.log("Aborting: Required parameters not given");
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
        var elemInput = window.document.getElementById(INPUT_ID);
        var elemOutput = window.document.getElementById(OUTPUT_ID);
        if (!(elemInput && elemOutput)) {
            console.log("Aborting: Required elements not found");
            return;
        }

        var rawContent = _dedentContent(elemInput.innerText.replace(/^\n/, ""));

        while (elemOutput.hasChildNodes()) {
            elemOutput.removeChild(elemOutput.lastChild);
        }

        elemOutput.innerHTML = marked(rawContent);
        elemInput.style.display = "none";
        return;
    }

    function _dedentContent(content){
        var indentSize = content.match(/^ */)[0].length
        var re = new RegExp("^" + " ".repeat(indentSize), "gm")
        return content.replace(re, "");
    }

    return {
        init: init
    };
})();
