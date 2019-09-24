(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const city = document.querySelector('.city');
const temperatures = document.querySelector('.temperature');
function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};
function success(pos) {
    var crd = pos.coords;
    lat =`${crd.latitude}`;
    lon =`${crd.longitude}`;
    const dataMyCity = fetch(`http://api.weatherstack.com/current?access_key=ecbd3da65c958e315a1e21868c7db671&query=${crd.latitude},${crd.longitude}`)
        .then(function (dataMyCity) {
            const myGeo = dataMyCity.json()
            return myGeo
        })
        .then(function (myGeo) {
            const {current: {temperature}, location: {name}, location: {country}} = myGeo;
            const name_city = `${name}`;
            const name_country = `${country}`;
            const temp = `${temperature}`;
            city.innerHTML = `${name}`;
            temperatures.innerHTML = `${temperature}`;
        })
};
module.exports = {
    errors,
    success
}
},{}],2:[function(require,module,exports){


const addParametr = require('./render');
const reload = require('./other')
const {errors,success} = require('./currentWeather')

const form = document.querySelector('form');
const temperatures = document.querySelector('.temperature');
const city = document.querySelector('.city');
const container= document.querySelector('.container');
const API_KEY = 'dcb0cec0612e417fa51142150191005';
const URL = 'https://api.apixu.com/v1/current.json?';
const keyMaps = '60c89b72b8c011'
const streets = L.tileLayer.Unwired({key: keyMaps, scheme: "streets"});
const clear = document.querySelector('.clear');
const find = document.querySelector('.find');
const myCity= document.querySelector('.my_city');
const input = document.querySelector('input');


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

form.addEventListener('submit', async (event) => {

    event.preventDefault();
    const data = await fetch(`http://api.weatherstack.com/current?access_key=ecbd3da65c958e315a1e21868c7db671&query=${input.value}`);
    const parsedData = await data.json();
    console.log(parsedData)
    const {current: {temperature}, location: {name}, location: {country}} = parsedData;
    const name_city = `${name}`;
    const name_country = `${country}`;
    const temp = `${temperature}`;
    city.innerHTML = `${name}`;
    temperatures.innerHTML = `${temperature}`;
    const url = await fetch(`https://eu1.locationiq.com/v1/search.php?key=60c89b72b8c011&q=${input.value}&format=json`)
    const dataMap = await url.json();
    const {lat} = dataMap[0];
    const {lon} = dataMap[0];
    L.marker([lat, lon]).addTo(map);
    addParametr(data, parsedData, name_city,name_country,temp);
    container.style.display="block"
});
myCity.addEventListener('click', (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(success,errors);
});
window.addEventListener('load', function() {
    if(localStorage.getItem('weather')){
        container.style.display="block"
    }
    else{
        container.style.display="none"
    }
});
clear.addEventListener('click', async () => {
    localStorage.clear();
    event.preventDefault();
    setTimeout(reload, 500);
});


},{"./currentWeather":1,"./other":3,"./render":4}],3:[function(require,module,exports){
function reload(event) {
    location.reload()
};
module.exports = reload
},{}],4:[function(require,module,exports){
var task = {
    current: [],
}
function addParametr(data, parsedData, name_city,name_country,temp) {
    newTask = {};
    newTask.city = name_city;
    newTask.country = name_country;
    newTask.temperature_city = temp;
    draw(task.current, find, document.querySelector('tbody'));
    localStorage.setItem('weather', JSON.stringify(task.current));

}
function draw(data) {
    var outCreate = '';
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].city)
        outCreate += '<tr><th>' + data[i].city + '</th>' + '<th>' + data[i].country + '</th>' + '<th>' + data[i].temperature_city + '</th></tr>';
    }
    document.querySelector('tbody').innerHTML = outCreate;
}
(function init() {
    if (localStorage.getItem('weather')) {
        task.current = JSON.parse(localStorage.getItem('weather'));
        draw(task.current, find, document.querySelector('tbody'));
    }
})()
module.exports = addParametr
},{}]},{},[2]);
