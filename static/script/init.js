
function space(func) {
	console.log("Executing", func);
}



var include = function () {
	var requestedScripts = 0;
	
	function scriptLoaded(module) {
		console.log("Script loaded");
	}
	
	function createScript(location) {
		var script = document.createElement("script");
		script.src=location;
		script.onload = scriptLoaded;
		document.head.appendChild(script);
	}
	
	function func(module) {
		console.log("Calling include", module);
		
		var path = module.split(".");
		var scriptname = path.join('/')+".js";
		
		createScript("/static/script/"+scriptname.toLowerCase());
	}
	
	
	
	return func;
};


var namespace = {
	include : include()
};

this.prototype = namespace;