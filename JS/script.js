let map;
let marker = L.marker([51.5, -0.09]);
let infoIp = document.getElementById('infoIp');
let infoLocation = document.getElementById('infoLocation');
let infoTimezone = document.getElementById('infoTimezone');
let infoIsp = document.getElementById('infoIsp');
let btnSearch = document.getElementById('btnSearch');

window.onload = () => {
    map = L.map('map')
    map.setView([1,1], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

const getClientIp = () => {
    fetch(`https://api.ipify.org/?format=json`)
    .then(response => response.json())
    .then(data => getIpLocation(data.ip));
}

const getIpLocation = (ipAddress) => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_lgks77mikFqR3RFCG0fYrAFDjisk4&ipAddress=${ipAddress}`)  
    .then(response => response.json())
    .then(data => {
        generateMap(data.location.lat,data.location.lng);
        changeChartInfo(data.ip,data.location.city.concat(", ",data.location.region),data.location.timezone,data.isp);
    });
}

const generateMap = (lat,long) => {
    marker.remove();
    map.setView([lat,long], 13);
    marker = L.marker([lat, long]);
    marker.addTo(map);
}

const changeChartInfo = (ip,location,timezone,isp) => {
    infoIp.innerHTML = ip;
    infoLocation.innerHTML = location;
    infoTimezone.innerHTML = "UTC " + timezone;
    infoIsp.innerHTML = isp;
}

btnSearch.addEventListener('click',() => getIpLocation(document.getElementById('inputIp').value));

document.addEventListener("keyup", () => {
    if (event.keyCode === 13) {
        getIpLocation(document.getElementById('inputIp').value)
    }
});

getClientIp();