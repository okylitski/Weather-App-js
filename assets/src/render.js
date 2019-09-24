var task = {
    current: [],
}
function addParametr(data, parsedData, name_city,name_country,temp) {
    console.log(parsedData)
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
function init() {
    if (localStorage.getItem('weather')) {
        task.current = JSON.parse(localStorage.getItem('weather'));
        draw(task.current, find, document.querySelector('tbody'));
    }
};
init()
module.exports = {
    addParametr,
}