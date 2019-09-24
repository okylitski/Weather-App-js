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