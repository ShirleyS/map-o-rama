function initialize(map_lat_long_img) {

	var mapOptions = {
		zoom: 16
	};

	var map = new google.maps.Map(document.getElementById('mapPlaceholder'),
		mapOptions);
	getLocation(map, addToMap);
	
};


function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} else {
			var content = 'Error: Your browser doesn\'t support geolocation.';
		}

		var options = {
			map: map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};
		// map.setCenter(options.position);
};

 // Try HTML5 geolocation
function getLocation(map,callback){

  if(navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position) {
  		var pos = new google.maps.LatLng(position.coords.latitude,
  			position.coords.longitude);

  		var lat = pos.k
  		var lng = pos.D

  		var infowindow = new google.maps.Marker({
  			map: map,
  			position: pos
	  			// content: ''
	  	});
	  	// position();
  		map.setCenter(pos);

	  		// map.setCenter(pos2);
	  	console.log("pos")

	  	console.log(pos)
  	  callback(map,pos);
	  }, 

  	function() {
  		handleNoGeolocation(true);
  	});  	
  	

  } 

  else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
   var lat = 0;
   var lng = 0;
    	callback(map,pos);

  };

};

markers=[];

function addToMap(map,pos){

	marker = new Object;
	var lat = pos.k
	var lng = pos.D
	// headers['Access-Control-Allow-Origin'] =instagramUrl
	$.ajax({
    url: "https://api.instagram.com/v1/media/search?lat="+lat+"&lng="+lng+"&distance=700&client_id=3362b329e39749228f959b78cc3e0d40",
    dataType: 'jsonp',
    success: function(dataWeGotViaJsonp){
    	console.log(dataWeGotViaJsonp)
        var text = '';
        var len = dataWeGotViaJsonp.data.length;
        console.log(dataWeGotViaJsonp.data.length)
        for(var i=0;i<len;i++){
        	console.log(dataWeGotViaJsonp.data[i])
          
        		var longitude = (dataWeGotViaJsonp.data[i].location.longitude);
						var latitude = (dataWeGotViaJsonp.data[i].location.latitude);
						var image = dataWeGotViaJsonp.data[i].images.low_resolution.url;

						marker[i] = new google.maps.Marker({
							map: map,
							position: new google.maps.LatLng(latitude,longitude),
							animation: google.maps.Animation.DROP,
							icon: {
								url:  image,
								size: new google.maps.Size(64, 64),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(16, 16),
								scaledSize: new google.maps.Size(64, 64) 
							}
				    })

	marker[i].setMap(map);
    }
}
});
}



google.maps.event.addDomListener(window, 'load', initialize);
