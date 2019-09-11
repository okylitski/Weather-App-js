const form = document.querySelector('form');
const input = document.querySelector('input');
const find = document.querySelector('.find');
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');
const API_KEY = 'dcb0cec0612e417fa51142150191005';
const URL = 'https://api.apixu.com/v1/current.json?';
const results = document.getElementById('results');
     // Maps access token goes here
    var key = 'pk.a5c3fbf2119bfb2275b62eddbccd76b3';

    // Initialize the map
    var map = L.map('map', {
        center: [39.73, -104.99], // Map loads with this location as center
        zoom: 2,
        scrollWheelZoom: false,
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
     const data = await fetch(`http://api.apixu.com/v1/current.json?key=26d10df7710a4383bda172954190909&q=${input.value}`);
    const parsedData = await data.json();
    const { current: { temp_c }, location: { name } } = parsedData;
    city.innerHTML = `${name}`;
    temperature.innerHTML = `${temp_c}`;
    const url= await fetch(`https://eu1.locationiq.com/v1/search.php?key=60c89b72b8c011&q=${input.value}&format=json`)
    const dataMap=await url.json();
	//console.log(dataMap[0])
	const{lat}= dataMap[0];
	const{lon}= dataMap[0]; 
    await L.marker([lat,lon]).addTo(map);
});

	//console.log(`${lat}`);
//console.log(dataMap[0])