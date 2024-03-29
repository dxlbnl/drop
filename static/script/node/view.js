var View = new Class({
	Extends: Node,
	
	type : "View",
	
	model     : undefined,
	
	setModel : function (model) {
		this.model = model;
		this.model.addView(this);
		
		Signal.connect(this.model.layoutChanged, this, this.render);
		this.render();
	},
	
});


