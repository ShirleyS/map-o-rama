function showCurrentLocation(o){console.log("shit"),console.log(o),navigator.geolocation?console.log(navigator.geolocation.getCurrentPosition(showCurrentLocation)):alert("Geolocation API not supported.");var e=o.coords.latitude,n=o.coords.longitude,a=new google.maps.LatLng(e,n),t={zoom:15,center:a,mapTypeControl:!0,mapTypeId:google.maps.MapTypeId.ROADMAP};map=new google.maps.Map(document.getElementById("mapPlaceholder"),t);var i=(new google.maps.Marker({position:a,map:map,title:"Current location!"}),[]);i.push(g);var g,l,p=new google.maps.InfoWindow;for(l=0;l<i.length;l++){console.log(i);var s=new google.maps.LatLng(i[l][1],i[l][2]);g=new google.maps.Marker({position:s,map:map,title:i[l][0]}),google.maps.event.addListener(g,"click",function(o,e){return function(){p.setContent(infoWindowContent[e][0]),p.open(map,o)}}(g,l))}}function addToMap(o){new google.maps.Marker({map:map,position:new google.maps.LatLng(o.data[i].location.latitude.to_json,position.data[i].location.longitude.to_json),animation:google.maps.Animation.DROP,icon:{url:o.data[i].images.low_resolution.url,size:new google.maps.Size(32,32),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(16,16),scaledSize:new google.maps.Size(32,32)}})}