var flybase = new Flybase("YOUR-FLYBASE-API-KEY", "flyalytics", "stats");
var data = {
	url: window.location.href,
	webgl: Modernizr.webgl,
	touch: Modernizr.touch,
	video: Modernizr.video,
	websocket: Modernizr.websockets
};
flybase.trigger( 'client-data', data );
