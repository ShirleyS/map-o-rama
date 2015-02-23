function initialize(map_lat_long_img) {
	var mapOptions = {
		zoom: 16
	};

	var map = new google.maps.Map(document.getElementById('mapPlaceholder'),
		mapOptions);

	getLocation(map, addToMap);
};

function handleNoGeolocation(errorFlag) {
	var options = {
		map: map,
		position: new google.maps.LatLng(0, 0),
		content: content
	};

	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} 
	else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}
	// map.setCenter(options.position);
};

function getLocation(map,callback){
  if(navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position) {
  		var pos = new google.maps.LatLng(position.coords.latitude,
  			position.coords.longitude);
  		var content = "<div>you</div>";
  		var marker = new google.maps.Marker({
  			map: map,
  			position: pos
	  	});
	  	// position();
  		map.setCenter(pos);
  	  callback(map,pos);
		  addInfoWindow(map,marker,content);	
	  },

  	function() {
  		handleNoGeolocation(true);
  	});  	
  } 

  else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
   	var pos = "no geolocation available"
  	callback(map,pos);
  };
};

function addToMap(map,pos){
	marker = new Object;
	var lat = pos.k
	var lng = pos.D
	$.ajax({
    url: "https://api.instagram.com/v1/media/search?lat="+lat+"&lng="+lng+"&distance=700&client_id=3362b329e39749228f959b78cc3e0d40",
    dataType: 'jsonp',
    success: function(dataWeGotViaJsonp){
      var len = dataWeGotViaJsonp.data.length;

      for(var i=0;i<len;i++){
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
		    var content = '<div id="popup_content">'+
  											'<div>'+'<h3>'+dataWeGotViaJsonp.data[i].caption.text +
  											'</h3>'+'</div>'+
  											'<img src ='+ dataWeGotViaJsonp.data[i].images.low_resolution.url + '>'+
  											'<div>'+
  											'<h4>'+dataWeGotViaJsonp.data[i].caption.from.username + '</h4>'+ '</div>'+
  											'</div>';  
		
				addInfoWindow(map,marker[i],content);	
    	}
		}
	});
}

function addInfoWindow(map,marker,content) {
    var infoWindow = new google.maps.InfoWindow({
        content: content
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);