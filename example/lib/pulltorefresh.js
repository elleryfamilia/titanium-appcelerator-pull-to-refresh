module.exports = function() {
	var _loadingCallback = null,
	_pulling = false,
	_reloading = false,
	_view = null,
	_arrow = null,
	_status = null,
	_lastUpdate = null,
	_activityIndicator = null,
	_canPerformRefresh = false;
	
	this.createPullToRefreshView = function(parameters) 
	{
		_loadingCallback = parameters.action;
		
		_view = Ti.UI.createView({
			backgroundColor:parameters.backgroundColor,			
			width: Ti.UI.FILL,
			height: 60,						
			
		});
		
		_arrow = Ti.UI.createView({
			backgroundImage:"/pulltorefresh/arrow.png",
			width:30,
			height:30,
			bottom:20,
			left:146
		});
		_view.add(_arrow);

		_status = Ti.UI.createLabel({
			text:"Pull to refresh...",
			left:55,
			width:220,
			bottom:35,
			height:"auto",
			color:parameters.labelColor,
			textAlign:"center",
			font:{fontSize:13,fontWeight:"bold"}
		});		
		
		_activityIndicator = Titanium.UI.createActivityIndicator({
			left:146,
			bottom:13,
			width:30,
			height:30,
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
		});
		_view.add(_activityIndicator);
		
		return _view;
		
	};

	this._scroll = function(e)
	{		
		var offset = e.contentOffset.y;
		if (offset <= -65.0 && !_pulling)
		{
			var t = Ti.UI.create2DMatrix();
			t = t.rotate(-180);
			_pulling = true;
			_arrow.animate({transform:t, duration:180});
			_status.text = "Release to refresh...";
			_canPerformRefresh = true;
			console.log("Release to refresh...");
		}
		else if (_pulling && offset > -65.0 && offset < 0)
		{
			_pulling = false;
			var t = Ti.UI.create2DMatrix();
			_arrow.animate({transform:t,duration:180});
			_status.text = "Pull to refresh...";
			_canPerformRefresh = false;
			console.log("Pull to refresh...");
		}
	};

	this._begin = function(e, tableView)
	{			
		if (_pulling && !_reloading && _canPerformRefresh)
		{
			_reloading = true;
			_pulling = false;
			_arrow.hide();
			console.log("showing activity indicator");
			_activityIndicator.show();
			_status.text = "Updating...";
			tableView.setContentInsets({top:60},{animated:true});
			_arrow.transform = Ti.UI.create2DMatrix();
			_loadingCallback();
			console.log("Updating....");
		}		
	};
	
	this._end = function(callback)
	{
		callback();
		_reloading = false;		
		_status.text = "Pull to refresh...";
		_activityIndicator.hide();
		_arrow.show();
	};
};