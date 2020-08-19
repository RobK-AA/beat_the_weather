import "./styles/index.scss";
// import Canvas from "./scripts/canvas";

const loader = document.getElementById('loader');
loader.style.display = "none";
const runner = document.getElementById('runner')
const score = document.getElementById('score')
let targetState;
console.log(targetState);

startGame() 

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 
  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

document.getElementById('fetch-weather').textContent = "Fetching weather...";
// Canvas.createCanvas();

function startGame() {
  targetState = undefined;
  initMap();
  runner.textContent = `Follow my travel instructions and see if you can Beat The Weather...before the Weather Beats You! Double click the map anywhere to begin.`
}

function initMap() {
  // debugger;
  let map;
  let latitude = 40 - Math.random();
  let longitude = -99 + Math.random();
  let location = { lat: latitude, lng: longitude };

  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 7 + Math.random(),
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
    document.getElementById('body').style.backgroundImage = "url('https://thumbs.gfycat.com/GargantuanMammothFrogmouth-size_restricted.gif')"
    getWeather(latitude, longitude, prevLat, prevLng);
  });
  
}


function getWeather(lat, long, prevLat, prevLng) {
  // debugger
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

function updateScore(weatherData, prevLat, prevLng) {
  // debugger
  let newLat = document.getElementById('latitude').textContent
  let newLng = document.getElementById('longitude').textContent
  getLocation(newLat, newLng, weatherData, prevLat, prevLng);
  loader.style.display = "none"
};

function getLocation(lat, lng, weatherData, prevLat, prevLng) {
  
  let newLat = document.getElementById('latitude').textContent
  let newLng = document.getElementById('longitude').textContent
  let locationData;
  const { prec_type, rh2m, weather } = weatherData.dataseries[0];
  fetch(`https://us1.locationiq.com/v1/reverse.php?key=9819a97aea2239&lat=${lat}&lon=${lng}&format=json`)
    .then((response) => response.json())
    .then((data) => {
      
      locationData = data;
      console.log(data);
      const { city, state } = locationData.address;
      // const city = document.getElementById('city-display') || document.createElement('div');
      // city.id = "city-display"
      // city.textContent = `City: ${data.display_name}`;
      // document.getElementById('location-box').append(city)
      if (prec_type === "rain" || weather.includes("rain") || weather.includes("shower")) {
        document.getElementById('body').style.backgroundImage = "url('https://bestanimations.com/Nature/Water/rain/rain-nature-animated-gif-32.gif')"
        alert('You got caught in the rain!');
        score.textContent = 0;
        runner.textContent = `You got caught in the rain! Double click the map anywhere to play again.`
        targetState = undefined;
      } else if (targetState !== undefined && targetState !== state) {
        alert('Wrong state, mate!');
        runner.textContent = `Wrong state, mate! Double click the map anywhere to play again.`
        score.textContent = 0;
        targetState = undefined;
      } else {
        targetState = states[Math.floor(Math.random() * states.length)];
        score.textContent = parseInt(score.textContent) + 1;
        runner.textContent = `The weather is nice here in ${city}, ${state}, isn't it? Now find some nice weather in ${targetState}.`
      }
    })
    .catch((error) => console.log(error)
    );

  loader.style.display = "none"
 
}

// function turn(data, prevLat, prevLng, target) {
//   updateScore(data, prevLat, prevLng)
// }