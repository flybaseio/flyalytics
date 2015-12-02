$( function() {
	var visitors = $('#visitors').epoch( {
		type: 'time.area', axes: ['left', 'bottom', 'right'],
		data: [ { values: [ { time: Date.now()/1000, y: 0 } ] } ]
	} );
	var pages = $( '#pages' ).epoch( { type: 'bar' } );
	var touch = $( '#touch' ).epoch( { type: 'time.gauge' } );
	var video = $( '#video' ).epoch( { type: 'time.gauge' } );
	var stats = {
		connections: 0,
		touch: 0,
		video: 0,
		pages: {}
	};

	var dashboard = new Flybase("YOUR-FLYBASE-API-KEY", "flyalytics", "stats");
	dashboard.on('online', function (data) {
		stats.connections = data.value();
	});	
	dashboard.on( 'client-data', function (data ){
		var data = atob( data );
		var data = JSON.parse( data );
		console.log( data );
		stats.touch += ( data.touch ? 1 : 0 );
		stats.video += ( data.video ? 1 : 0 );
		var pageCount = stats.pages[ data.url ] || 0;
		stats.pages[ data.url ] = ++pageCount;
		dashboard.trigger( 'stats-updated', 1 );
	});
	dashboard.on( 'stats-updated', function( update ) {
		// Convert to percentages
		touch.update( ( stats.touch / stats.connections ) || 0 );
		video.update( ( stats.video / stats.connections ) || 0 );
		var pagesData = [];
		for( var url in stats.pages ) {
			pagesData.push( { x: url, y: stats.pages[ url ] } );
		}
		pages.update( [ { values: pagesData } ] );

		visitors.push( [ { time: Date.now()/1000, y: stats.connections } ] );
	});
});
