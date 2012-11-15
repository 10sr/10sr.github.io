google.load("feeds", "1");

function initialize() {
    var container = document.getElementById("ff_feed");
    container.appendChild(document.createTextNode("Loading..."));

    var ff_feed = new google.feeds.Feed("http://friendfeed.com/10sr?format=atom");
    ff_feed.setNumEntries(20);
    ff_feed.load(function(result) {
        if (!result.error) {
            function zeropad(n){
                return ("0" + n.toString()).slice(-2);
            }
            function d2str(d){
                return "" + d.getFullYear() + "/" +
                    zeropad(d.getMonth()) + "/" +
                    zeropad(d.getDate()) + " " +
                    zeropad(d.getHours()) + ":" +
                    zeropad(d.getMinutes()) + ":" +
                    zeropad(d.getSeconds());
            }
            var container = document.getElementById("ff_feed");
            container.removeChild(container.firstChild); // remove "Loading..."
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var div = document.createElement("div");
                var content = document.createElement("span");
                var date = new Date(entry.publishedDate);
                var perma = document.createElement("a");
                content.appendChild(document.createTextNode(entry.title));
                perma.setAttribute("href", entry.link);
                perma.appendChild(document.createTextNode(d2str(date)));
                div.appendChild(perma);
                div.appendChild(document.createTextNode(" : "));
                div.appendChild(content);
                container.appendChild(div);
            }
        }
    });
}
google.setOnLoadCallback(initialize);
