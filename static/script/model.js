
var Model = new Class({
	
	initialize : function (identifier) {
		this.data = data;
		this.length = data.length;
		this.sortKey = "";
		this.sortOrder = 1;
		
		this.identifier = identifier;
		
		this.layoutChanged = Signal();
	},
	
	addView : function (view) {
		Model.views.push(view);
	},
	
	length : function () {
		return this.data.length;
	},
	
	get : function(options) {
		var res = [];
			
		begin = options.begin ? options.begin : 0;
		end   = (options.end !== undefined) ? options.end   : this.data.length;
		
		this.data.sort(function (a, b) {
			if (a[this.sortKey] < b[this.sortKey]) {
				return this.sortOrder;
			}
			
			return - this.sortOrder;
		}.bind(this));
		
		this.data.slice(begin, end).each(function(item) {
			var o = {};
			if ((options.keys) && (options.keys.length != 0)) {
				options.keys.each(function (key) { 
					o[key] = item[key]; 
				});
				o._id = item._id;
				res.push(o);
			} else {
				res.push(item);
			}
		}.bind(this));
		return res;
	},
	
	set : function (id, obj) {
		console.log("Setting", id, obj);
	},
	
	sort : function(key)  {
		
		if (this.sortKey === key) {
			this.sortOrder = - this.sortOrder;
		} else {
			this.sortKey = key;
			this.sortOrder = 1;
		}
		this.layoutChanged();
	},
});
Model.views = [];