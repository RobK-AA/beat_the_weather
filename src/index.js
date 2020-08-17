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
    disableDoubleClickZoom: false,
    draggableCursor: "url(/dist/images/clear.png), auto !important",
  });
  
  google.maps.event.addListener(map, "mousemove", function (e) {
    document.getElementById("latitude").textContent = e.latLng.lat();
    document.getElementById("longitude").textContent = e.latLng.lng();
  });
  
}

