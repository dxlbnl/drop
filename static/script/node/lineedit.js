
var LineEdit = new Class({
	Extends : Node,
	
	type : "LineEdit",
	
	template : "<input type=text></input>",
	
	sizePolicy  : {x:'Expanding', y:'Fixed'},
	
	directive : {
		"input@value" : "value"
	},
	
	events : {
		"keypress:relay(input)" : function (e) {
			console.log("Keypressed", e);
			this.valueChanged(e.target.value + String.fromCharCode(e.code));
		},
	},
	
	initialize : function (container) {
		this.parent(container);
		
		this.valueChanged = new Signal();
		
		
	},
	
	keydown : function (e) {
		console.log("Keydown", this, e);
	},
	
	setValue : function (value) {
		this.value = value;
		this.render();
	},
});