/*
	include() loads scripts asynchronously...
*/
function include(url,success) {
	var head = document.getElementsByTagName("head")[0], done = false;
	var script = document.createElement("script");
	script.src = url;
	// Attach handlers for all browsers
	script.onload = script.onreadystatechange = function(){
		if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
			done = true;
			if (typeof success === 'function') success();
		}
	};
	head.appendChild(script);
}

//	load modernizer first...
include('https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.min.js',function(){
	//	now load flybase.js...
	include('https://cdn.flybase.io/flybase.js',function(){
		//	now initialize and track...
		flyalytics_init();
	});
});

/*
Once we've included modernizr and flybase, then we call this function to begin tracking.	
*/
function flyalytics_init(){
	var flybase = new Flybase("YOUR-FLYBASE-API-KEY", "flyalytics", "stats");
	var data = {
		url: window.location.href,
		webgl: Modernizr.webgl,
		touch: Modernizr.touch,
		video: Modernizr.video,
		websocket: Modernizr.websockets
	};
	flybase.trigger( 'client-data', data );
}

// you can use flyalytics_event to push custom events to the `client-event` listener.
function flyatics_event(data){
	flybase.trigger( 'client-event', data );
}