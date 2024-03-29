
var Node = new Class({
	parentNode : undefined,
	template  : undefined,
	
	sizePolicy  : {x:'Expanding', y:'Expanding'},
	
	cssClasses : function () {
		// returns a list of css classes
		r = [];
		Object.each(Object.clone(this.sizePolicy), function (policy, direction) {
			r.push(direction + "-" + policy);
		});
		return r;
	},
	
	directive : {
		'@class+' : function () { return " " + this.cssClasses().join(' '); },
	},
	
	events : undefined,
	
	toElement : function () {
		return $(this.id);
	},
	
	// get placeholder
	getPlaceHolder : function () {
		return new Element("span", {id:this.id, class:this.type});
	},
	
	initialize : function (parentNode) {
		this.id = this.generateID();
		
		this.__defineGetter__("placeholder", this.getPlaceHolder);
		
		// define layout and style
		this.layout = CSSLayout.create("#" + this.id);
		
// 		this.onresize = new Signal();
// 		Signal.connect(parentNode.onresize, this, this.resize);
		
		if (parentNode) {
			this.parentNode = parentNode;
			this.parentNode.addChild(this);
			
			this.render();
		} else {
			throw "No parentNode defined";
		}
		
	},
	
	render : function () {
		if (this.template) {
			// Renders this node completely
			
			if (typeof this.template === 'string') {
				$(this).set({html:this.template});
				this.template = $(this).compile(Object.clone(this.directive));
			}
			$(this).render(this, this.template);
			this.parentNode.resize();
		}
		
		if (this.events) {
			var e = {}, self = this;
			Object.each(Object.clone(this.events), function (handler, name) {
				e[name] = handler.bind(self);
			});
			
			$(this).addEvents(e);
		}
		
	},
	
	generateID : function () {
		if (!(this.type in Node.uniqueIDS)) {
			Node.uniqueIDS[this.type] = 0;
		}
		return this.type + Node.uniqueIDS[this.type] ++;
	},
	
	resize : function(size) {
		var properties = {float:'left'};
		// resizes the node to size.
		
		if (size) { 
			// if size specified, resize if nescessary			
			if ((this.size) && (this.size.x === size.x) && (this.size.y === size.y)) { 
				// don't resize if size remains the same.
				return;
			} else {
				console.log("Resizing", this.id, size.x, size.y);
				this.size = size;
				
				if (size.x) properties.width  = size.x + "px";
				if (size.y) properties.height = size.y + "px";
				this.layout.set(properties);
			}
			
		} else if (this.size)
			return this.size;
		
		return size;
	},
		
});
Node.uniqueIDS = {};

