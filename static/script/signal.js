
function Signal() {
	signal = function () {
		var args = [],
			slots, i;
		for (i=0; i<arguments.length; i++) {
			args.push(arguments[i]);
		}
		
		if (arguments.callee.id in Signal.signals) {
			slots = Signal.signals[arguments.callee.id];
			for ( i=0; i<slots.length; i++) {
				slots[i].slot.apply(slots[i].instance, args);
			}
		}
	};
	signal.id = Signal.unique++;
	
	return signal;
};

Signal.unique = 0;
Signal.signals = {};
Signal.connect = function (signal, instance, slot) {
	if (slot == undefined) {
		slot = instance; instance = null;
	}
	
	if (signal.id in Signal.signals) {
		
		Signal.signals[signal.id].push({instance:instance, slot:slot});
	} else {
		
		Signal.signals[signal.id] = [{instance:instance, slot:slot}];
	}
};



