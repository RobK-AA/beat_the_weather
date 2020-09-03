import "./styles/index.scss";

const loader = document.getElementById('loader');
loader.style.display = "none";
loader.style.position = "relative";
const runner = document.getElementById('runner');
const score = document.getElementById('score');
let targetState;
const streak = document.getElementById('streak');
let highScore = getHighScore();
streak.textContent = parseInt(highScore);
const clock = document.getElementById('clock');
const clockLabel = document.getElementById('clock-label');
const modalContent = document.getElementById('modal-body');
const modalHeader = document.getElementById('modal-header');
const modal = document.getElementById('modal-container');
modal.style.display = "none";
const body = document.getElementById('body');
const rainBackground = document.getElementById('rain-background');

startGame() 

body.addEventListener("click", () => {
  modal.style.display = "none"
});

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

function startGame() {
  if (!clock.textContent) clockLabel.style.display = "none";
  targetState = undefined;
  rainBackground.style.display = "none";
  initMap();
  displayModal();
  runner.textContent = `Follow my instructions, watch the clock and see if you can beat the weather...before the weather beats you! Double click the map anywhere to begin.`
}

function displayModal() {
  modal.style.display = "flex";
  modal.style.flexDirection = "column"
  modalHeader.textContent = "Welcome to Beat the Weather!";
  modalContent.textContent = "This game was developed with JavaScript, HTML5, & CSS3. It utilizes the following API's: Google Maps, Open Weather Map and LocationIQ.";
}

function initMap() {

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
    styles: [{
      "featureType": "all",
      "elementType": "labels",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }, 
      {}]
  });
  
  google.maps.event.addListener(map, "dblclick", function (e) {
    latitude = e.latLng.lat();
    longitude = e.latLng.lng();
    const prevLat = document.getElementById('latitude').textContent
    const prevLng = document.getElementById('longitude').textContent
    document.getElementById("latitude").textContent = latitude;
    document.getElementById("longitude").textContent = longitude;
    // document.getElementById('body').style.backgroundImage = "url('https://thumbs.gfycat.com/GargantuanMammothFrogmouth-size_restricted.gif')"
    getWeather(latitude, longitude, prevLat, prevLng);
    clock.textContent = 10
    tick;
    
  });
  
}


function getWeather(lat, long, prevLat, prevLng) {
  map.style.borderColor = "gold";
  loader.style.display = "inline-block";

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=bd9ea9b48f291160192d69ca01301a7f`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      updateScore(data, prevLat, prevLng);
    })
    .catch((error) => console.log(error)
    );
}

function updateScore(weatherData, prevLat, prevLng) {

  let newLat = document.getElementById('latitude').textContent
  let newLng = document.getElementById('longitude').textContent
  getLocation(newLat, newLng, weatherData, prevLat, prevLng);
  
  loader.style.display = "none"
};

function getLocation(lat, lng, weatherData, prevLat, prevLng) {
  
  let newLat = document.getElementById('latitude').textContent
  let newLng = document.getElementById('longitude').textContent
  let locationData;
  map.style.borderColor = "black";
  const { description, main } = weatherData.weather[0];
  fetch(`https://us1.locationiq.com/v1/reverse.php?key=9819a97aea2239&lat=${lat}&lon=${lng}&format=json`)
    .then((response) => response.json())
    .then((data) => {
      
      locationData = data;
      // console.log(data);
      const { city, state } = locationData.address;
      
      if (description.includes("rain") || description.includes("shower") || main.includes("rain") || main.includes("shower")) {
        // document.getElementById('body').style.backgroundImage = "url('https://bestanimations.com/Nature/Water/rain/rain-nature-animated-gif-32.gif')"
        rainBackground.style.display = "block";
        // alert('You got caught in the rain!');
        let currentScore = score.textContent;
        score.textContent = 0;
        runner.textContent = `You got caught in the rain! Double click the map anywhere to play again.`
        targetState = undefined;
        clock.textContent = "";
        updateStreak(currentScore);
      } else if ((targetState !== undefined) && (targetState !== state || state === undefined || locationData === undefined)) {
        // alert('Wrong state, mate!');
        runner.textContent = `Wrong state, mate! Double click the map anywhere to play again.`
        let currentScore = score.textContent;
        score.textContent = 0;
        targetState = undefined;
        clock.textContent = "";
        updateStreak(currentScore);
      } else {
        targetState = states[Math.floor(Math.random() * states.length)];
        score.textContent = parseInt(score.textContent) + 1;
        if (city) {
          runner.textContent = `The weather is nice here in ${city}, ${state}, isn't it? Now find some nice weather in ${targetState}.`
        } else {
          runner.textContent = `The weather is nice here in ${state}, isn't it? Now find some nice weather in ${targetState}.`
        }
        updateStreak(score.textContent);
      }
    })
    .catch((error) => console.log(error)
    );
  loader.style.display = "none"
}

function updateStreak (currentScore) {
  if (parseInt(currentScore) > parseInt(streak.textContent)) {
    streak.textContent = parseInt(currentScore);
    localStorage.setItem('highScore', parseInt(currentScore));
  }
}

const tick = setInterval(function() {
  if (clock.textContent) clockLabel.style.display = "block";
  if (parseInt(clock.textContent) > 0 && loader.style.display === "none") {
    clock.textContent = parseInt(clock.textContent) - 1
  } else if (parseInt(clock.textContent) === 0) {
    // alert('Out of time!');
    runner.textContent = `You ran out of time! Double click the map anywhere to play again.`
    let currentScore = score.textContent;
    score.textContent = 0;
    targetState = undefined;
    updateStreak(currentScore);
    clock.textContent = "";
  }
}, 1000)

function getHighScore() {
  return localStorage.getItem('highScore') || '0';
}