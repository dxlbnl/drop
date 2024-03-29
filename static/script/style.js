// it caches all changes to the rules, and with a set interval it 
// disables the stylesheet, applies the new rules, and enables it., to minimize html paint time. 



var StyleRule = new Class({
	initialize : function (sheet, selector, rule) {
		this.sheet = sheet;
		this.selector = selector;
		this.cached = (rule) ? rule : {};
		
		
		this.__defineGetter__('rule', this.getRule);
	},
	
	getRule : function () {
		if (!this._rule) {
			this._rule = this.sheet.addRule(this.selector);
		}
		return this._rule;
	},
	
	set : function(property, value) {
		var r = {};
		
		if (value !== undefined) {
			r[property] = value;
		} else {
			r = property;
		}
		
		Object.append(this.cached, r);
		this.sheet.changed();
		
	},
	
	apply : function () {
		// applies the cached rule in the stylesheet.
		Object.each(this.cached, function (value, property) {
			this.rule.style.setProperty(property, value, null);
		}.bind(this));
		
	},
});


var Style = new Class({
	delay : 50, // uncache once a second.
	
	initialize : function (title) {
		// creates 2 stylesheets, disables one.
		this.sheet = Style.makeStyleSheet(title);
		
		this.rules = [];
		
		this.timer = undefined;
		
// 		this.uncache.periodical(this.interval, this);
	},
	
	changed : function () {
		// this function is called when a rule has changed, it waits the delay and uncaches if no changes happen in between.
		if (this.timer) clearTimeout(this.timer);
		
		this.timer = this.uncache.delay(this.delay, this);
	},
	
	create : function(selector, rule) {
		// creates a new stylerule. and put it in cache
		var rule = new StyleRule(this, selector, Object.clone(rule));
		this.rules.push(rule);
		return rule;
	},
	
	addRule : function (selector) {
		// add a rule to the stylesheet, and find the object.
		if (this.sheet.addRule) {
			this.sheet.addRule(selector, null);
			return this.sheet.rules[this.sheet.rules.length -1];
		} else { 
			this.sheet.insertRule(selector + "{}", 0);
			return this.sheet.cssRules[this.sheet.cssRules.length -1];
		}
	},
	
	uncache : function () {
		// disable the stylesheet.
		this.sheet.disabled = true;
		// apply all the rules
		this.rules.invoke('apply');
		// enable the stylesheet.
		this.sheet.disabled = false;
	},
});


Style.makeStyleSheet = function (title) {
	// creates a stylesheet and returns it.
	s = new Element("style", {title : title});
	
	// add the stylesheet to the dom.
	document.head.appendChild(s);
	
	for(var i=0; i<document.styleSheets.length; i++) {
		var sheet = document.styleSheets[i];
		if(sheet.title == title) {
			console.log("Found sheet", sheet);
			return sheet;
		}
	}
};

var CSSLayout = new Style('layout');
var CSSStyle = new Style('style');

