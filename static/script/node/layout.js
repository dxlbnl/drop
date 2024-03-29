
var Layout = new Class({
	Extends : Node,
	
	type : "Layout",
	
	children : [],
	
	initialize : function(parentNode) {
		this.parent(parentNode);
		
		this.direction = "horizontal";
	},
	
	setDirection : function(direction) {
		this.direction = direction;
	},
	
	addChild : function(child) {
		this.children.push(child);
		$(this).grab(child.placeholder);
		
		this.resize();
	},
	
	resize : function(size) {
		var axis, space, expandingChildren = [];
		
		size = this.parent(size);
		if (size) {
			axis  = (this.direction == "horizontal") ? 'x' : 'y';
			space = size[axis];
			
			// make sure all space is divided in the direction.
			// first, measure the space needed by the fixed children.
			this.children.each(function(child) {
				var s = Object.clone(size);
				switch (child.sizePolicy[axis]) {
					case "Expanding":
						expandingChildren.push(child);
						break;
					case "Fixed":
						s[axis] = undefined; 
						space -= $(child).getSize()[axis]; // this child wont be expanding
						child.resize(s);
						break;
						
					default: throw "Unknown size policy: "+child.sizePolicy[axis];
				}
			});
			
			
			if (expandingChildren) {
				
				expandingChildren.each(function (child) {
					var s = Object.clone(size);
					s[axis] = space / expandingChildren.length;
					child.resize(s);
				});
			}
		}
	},
	
});
