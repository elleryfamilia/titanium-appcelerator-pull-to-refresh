<h1>What?</h1>
<p>This method, will help you to make a view "pull to refresh" in your TableView.</p>
<h1>How?</h1>
<p>To use this method, you will need to include this files in your project:</p>
<pre>var PullToRefresh = require("/lib/pulltorefresh");</pre>
<p>After include the libraries, you will need to instance a pull-to-refresh variable, like this:</p>
<pre>
	var pullToRefresh = new PullToRefresh();

	var pullToRefreshView = pullToRefresh.createPullToRefreshView({
	backgroundColor:"#CCC",
	labelColor:"#000",
	action: function() {
		setTimeout(function() {
			refresh();
		}, 500);
	}
});</pre>
<p>You can configure the colors, and in the <b>action</b>, you will put the callback, when the user pull the view (the action). After this, you will add the pull-to-refreshed instanced to your TableView and copy two events (scroll and scrollEnd), like this:</p>
<pre>var tableView = Ti.UI.createTableView();

<b>tableView.headerPullView = pullToRefreshView;</b>

tableView.addEventListener("scroll",function(e) {
	pullToRefresh._scroll(e);
});

tableView.addEventListener("dragend",function(e) {
	pullToRefresh._begin(e, this);
});</pre>
<p>And, when you finish to show your new data, you will need to keep your TableView at the top, like this:</p>
<pre>PullToRefresh._end(function() {
	tableView.setContentInsets({top:0},{animated:true});
});
</pre>
