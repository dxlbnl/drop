var TableView = new Class({
	Extends : View,
	
	type : "TableView",
	
	template : "<table>\
					<tr class='heading'><th></th></tr>\
					<tr class='row'><td></td></tr>\
				</table>",
	
	directive : {
		".heading th" : {
			"head<-heading" : {
				"." : "head",
				"@class" : "head" ,
			}
		},
		".row" : {
			"row<-data" : {
				"@_id" : "row._id",
				"td" : {
					"head<-heading" : {
						"." : function (c) { 
							return c.row.item[c.item]; 
							
						}
					}
				}
			},
		}
	},
	
	rowHeight : 22,
	
	events : {
		"click:relay(th)" : function (e) {
			this.headerClicked(e.target.className);
		},
	},
	
	initialize : function (container) {
		this.parent(container);
		
		this.heading = [];
		
		this.headerClicked = Signal();
		
		this.__defineGetter__("data", this._data);
		
		
// 		Signal.connect(this.firstVisible, this, this.started);
	},
	
	setModel : function (model) {
		this.parent(model);
		Signal.connect(this.headerClicked, this.model, this.model.sort);
	},
	
	setHeading : function (heading) {
		// only return keys from heading
		this.heading = heading ? heading : [];
		this.render();
	},
	
	_data : function () {
		// look up data in the model
		if (this.model) {
			return this.model.get({ keys:this.heading});
		}
	},
	
});

var ScrollMixin = {
	events : {
		"mousewheel" : function (e) {
			console.log("mouseWheel event on", this.id, e);
			if (e.wheel === -1) {
				var e = $(this).getElements("tr");
				e[1].dispose();
			}
		},
	},
	
	rowDisplayed : function () {
		// calculates how much rows are needed.
		
		if (this.size) {
			return Math.ceil(((this.size.y) - this.rowHeight) / this.rowHeight);
		}
		return 0;
	},
	
	_data : function () {
		// look up data in the model
		if (this.model) {
			return this.model.get({
				keys:this.heading, 
				begin:0, 
				end:this.rowDisplayed()
			});
		}
	},
};

var PageMixin = {
	template : "<table>\
					<tr class='heading'><th></th></tr>\
					<tr class='row'><td></td></tr>\
					<tr class='paging'><input type='button' value='previous'></input><input type='button' value='next'></input></tr>\
				</table>",
				
	rowDisplayed : function () {
		// calculates how much rows are needed.
		
		if (this.size) {
			return Math.floor(((this.size.y) - this.rowHeight) / this.rowHeight) - 1;
		}
		return 0;
	},
	
	_data : function () {
		// look up data in the model
		if (this.model) {
			return this.model.get({
				keys:this.heading, 
				begin:0, 
				end:this.rowDisplayed()
			});
		}
	}
};