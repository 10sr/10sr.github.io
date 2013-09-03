var CookieTest = (function(){
    var k1 = "key1";
    var k2 = "key2";

    function init(){
        window.addEventListener("load", onLoadHandler);
    }

    function setCookie(key, value, secure){
        if (! key || ! value) {
            return;
        }
        var c = key + "=" + value;
        if (secure) {
            c = c + "; secure";
        }
        window.document.cookie = c;
    }

    function getCookie(key){
        var c = window.document.cookie.split(";");
        var pair;

        for (var i = 0; i < c.length; i++) {
            pair = c[i].replace(/^\s+|\s+$/g, "").split("=");
            if (pair[0] === key) {
                return pair[1];
            }
        }
        return null;
    }

    function onLoadHandler(){
        var v1 = getCookie(k1);
        var v2 = getCookie(k2);
        var num1, num2;

        if (v1) {
            num1 = parseInt(v1) + 1;
        } else {
            num1 = 0;
        }
        if (v2) {
            num2 = parseInt(v2) + 2;
        } else {
            num2 = 0;
        }

        alert("num1 : " + num1.toString() + " num2 : " + num2.toString());

        setCookie(k1, num1.toString());
        setCookie(k2, num2.toString());
    }

    return {
        init : init
    };
})();

CookieTest.init();
