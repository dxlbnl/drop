var MainWindow = new Class({
	widget : undefined,
	
	type : "MainWindow",
	
	initialize : function() {
		window.onresize = this.resize.bind(this);
	},
	
	addChild : function(widget) {
		this.widget = widget;
		document.body.grab(this.widget.placeholder);
		this.resize();
	},
	
	
	resize : function (e) {
		var s = window.getSize();
		
		if (e)
			e.stopPropagation();
		console.log("Getting size",e,  s.x, s.y);
		
		this.widget.resize(s);
	},
});
