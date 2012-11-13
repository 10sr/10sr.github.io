google.load("feeds", "1");

function initialize() {
    function d2str(d){
        return "" + d.getFullYear() + "/" +
            d.getMonth() + "/" +
            d.getDate() + " " +
            d.getHours() + ":" +
            d.getMinutes() + ":" +
            d.getSeconds();
    }
    var github_feed = new google.feeds.Feed("https://github.com/10sr.atom");
    github_feed.setNumEntries(7);
    github_feed.load(function(result) {
        if (!result.error) {
            var container = document.getElementById("github_feed");
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var div = document.createElement("div");
                var date = new Date(entry.publishedDate);
                div.appendChild(document.createTextNode(d2str(date) +
                                                        " : " +
                                                        entry.title));
                container.appendChild(div);
            }
        }
    });
    var twitter_feed = new google.feeds.Feed("http://twittergoodrss.herokuapp.com/41216479189113804527/10sr");
    twitter_feed.setNumEntries(7);
    twitter_feed.load(function(result) {
        if (!result.error) {
            var container = document.getElementById("twitter_feed");
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var div = document.createElement("div");
                var date = new Date(entry.publishedDate);
                div.innerHTML = entry.content;
                div.removeChild(div.firstChild); // remove icon
                div.insertBefore(document.createTextNode(d2str(date) + " : "),
                                 div.firstChild);
                container.appendChild(div);
            }
        }
    });
}
google.setOnLoadCallback(initialize);
