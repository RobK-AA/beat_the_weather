import "./styles/index.scss";
initMap();

function initMap() {
  let map;
  let latitude = 40.8 - Math.random();
  let longitude = -73.8 + Math.random();

  let location = { lat: latitude, lng: longitude };

  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 13 + Math.random(),
    disableDoubleClickZoom: false
  });
  
  google.maps.event.addListener(map, "mousemove", function (event) {
    document.getElementById("latitude").innerHTML = event.latLng.lat();
    document.getElementById("longitude").innerHTML = event.latLng.lng();
  });
}

