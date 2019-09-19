const form = document.querySelector('form');
const input = document.querySelector('input');
const find = document.querySelector('.find');
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');
const API_KEY = 'dcb0cec0612e417fa51142150191005';
const URL = 'https://api.apixu.com/v1/current.json?';
const keyMaps = '60c89b72b8c011'
const streets = L.tileLayer.Unwired({key: keyMaps, scheme: "streets"});
const error = document.querySelector('.error');
const clear = document.querySelector('.clear');
const container= document.querySelector('.container');
// Maps access token goes here
var key = 'pk.a5c3fbf2119bfb2275b62eddbccd76b3';

// Initialize the map
var map = L.map('map', {
    center: [39.73, -104.99], // Map loads with this location as center
    zoom: 2,
    layers: [streets],
});

// Add the 'scale' control
L.control.scale().addTo(map);

// Add the 'streets' layer to the map
L.tileLayer('https://{s}-tiles.locationiq.org/v2/obk/r/{z}/{x}/{y}.png?key={accessToken}', {
    attribution: '<a href=\"https://unwiredlabs.com/locationapi?ref=maps\" target=\"_blank\">© Unwired Labs</a> <a href=\"https://openstreetmap.org/about/\" target=\"_blank\">© OpenStreetMap</a>',
    maxZoom: 18,
    id: 'streets',
    accessToken: key
}).addTo(map);

var task = {
    current: [],
};
(function init() {
    if (localStorage.getItem('weather')) {
        task.current = JSON.parse(localStorage.getItem('weather'));
        draw(task.current, find, document.querySelector('tbody'));
    }
})();


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = await fetch(`https://api.apixu.com/v1/current.json?key=26d10df7710a4383bda172954190909&q=${input.value}`);
    const parsedData = await data.json();
    const {current: {temp_c}, location: {name}, location: {country}} = parsedData;
    const name_city = `${name}`;
    const name_country = `${country}`;
    const temp = `${temp_c}`;
    city.innerHTML = `${name}`;
    temperature.innerHTML = `${temp_c}`;
    const url = await fetch(`https://eu1.locationiq.com/v1/search.php?key=60c89b72b8c011&q=${input.value}&format=json`)
    const dataMap = await url.json();
    const {lat} = dataMap[0];
    const {lon} = dataMap[0];
    await L.marker([lat, lon]).addTo(map);
    await addParametr(data, parsedData, name_city,name_country,temp)
    container.style.display="block"
});
clear.addEventListener('click', async () => {
    localStorage.clear();
    event.preventDefault();
    setTimeout(reload, 2500);
})
function addParametr(data, parsedData, name_city,name_country,temp) {
    newTask = {};
    newTask.city = name_city;
    newTask.country = name_country;
    newTask.temperature = temp;
    task.current.push(newTask);
    draw(task.current, find, document.querySelector('tbody'));
    //document.querySelector('tbody').innerHTML +='<tr><th>'+ newTask.city +'</th>'+'<th>'+ newTask.country +'</th>'+'<th>'+ newTask.temperature +'</th></tr>';
    localStorage.setItem('weather', JSON.stringify(task.current));
}
function draw(data) {
    var outCreate = '';
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].city)
        outCreate += '<tr><th>' + data[i].city + '</th>' + '<th>' + data[i].country + '</th>' + '<th>' + data[i].temperature + '</th></tr>';
    }
    document.querySelector('tbody').innerHTML = outCreate;
}
function reload(event) {
    location.reload()
};
(function () {
    function onPositionReceived(position) {
        console.log(position)
    }
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onPositionReceived)
    }
}())
