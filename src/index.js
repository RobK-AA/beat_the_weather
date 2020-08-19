import "./styles/index.scss";
import Canvas from "./scripts/canvas";

initMap();

const loader = document.getElementById('loader');
loader.style.display = "none";
document.getElementById('fetch-weather').textContent = "Fetching weather...";
Canvas.createCanvas();

function initMap() {
  let map;
  let latitude = 40.8 - Math.random();
  let longitude = -73.8 + Math.random();

  let location = { lat: latitude, lng: longitude };

  

  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 10 + Math.random(),
    disableDoubleClickZoom: true,
    cursor: "url(/dist/images/clear.png), auto !important",
    draggableCursor: "url(/dist/images/clear.png), auto !important",
    draggingCursor: "url(/dist/images/clear.png), auto !important",
  });


  google.maps.event.addListener(map, "dblclick", function (e) {
    latitude = e.latLng.lat();
    longitude = e.latLng.lng();
    const prevLat = document.getElementById('latitude').textContent
    const prevLng = document.getElementById('longitude').textContent
    document.getElementById("latitude").textContent = latitude;
    document.getElementById("longitude").textContent = longitude;

    getWeather(latitude, longitude, prevLat, prevLng);
  });
  
}


function getWeather(lat, long, prevLat, prevLng) {
  loader.style.display = "block";
  fetch(`http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civil&output=json`)
    .then((response) => response.json())
    .then((data) => {
      
      document.getElementById('temp').textContent = data.dataseries[0].rh2m;
      document.getElementById("weather").textContent = data.dataseries[0].weather;
      console.log(data);
      updateScore(data, prevLat, prevLng);
      updateEffects(data);
    })
    .catch((error) => console.log(error)
    );
}

function updateScore(data, prevLat, prevLng) {
  let score = document.getElementById('score');
  let newLat = document.getElementById('latitude').textContent
  let newLng = document.getElementById('longitude').textContent

  const { prec_type, rh2m, weather } = data.dataseries[0];
  getLocation(newLat, newLng);
  if (prec_type === "rain" || weather.includes("rain") || weather.includes("shower")) {
    alert('You got caught in the rain!');
    score.textContent = 0;
  } else if ((Math.abs(newLat - prevLat) < .1 && Math.abs(newLng - prevLng) < .1) && (prevLat) && score !== 0) {
    alert('Stop playing it safe! Each move must be at least .1 lat or lng away from the previous move!');
    score.textContent = 0;
  } else {
    score.textContent = parseInt(score.textContent) + 1;
    loader.style.display = "none"
  }
};

function getLocation(lat, lng) {
  fetch(`https://us1.locationiq.com/v1/reverse.php?key=9819a97aea2239&lat=${lat}&lon=${lng}&format=json`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error)
    );
}