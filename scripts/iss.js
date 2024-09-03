const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

// Variables to store the map and marker
let map;
let marker;

function initMap() {
    // Initialize the map centered at a default location (0,0)
    map = L.map('map').setView([0, 0], 4);

    // Set up the tile layer
    const tileURL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    const tiles = L.tileLayer(tileURL, { attribution });
    tiles.addTo(map);

    // Initialize the marker at a default location (0,0)
    marker = L.marker([0, 0]).addTo(map);
}

// Async function to fetch ISS data
async function getISS() {
    // Use fetch method to load api url
    const response = await fetch(api_url);

    // Save the response into the data var converted to JSON
    const data = await response.json();

    // Declare and initialize variables to store lat and long from json data
    const { name, id, latitude, longitude, altitude, velocity, visibility, timestamp, daynum, solar_lat, solar_lon, units } = data;

    // Instruct the browser to load above data into HTML
    document.getElementById('name').textContent = name;
    document.getElementById('id').textContent = id;
    document.getElementById('lat').textContent = latitude;
    document.getElementById('long').textContent = longitude;
    document.getElementById('alt').textContent = altitude;
    document.getElementById('vel').textContent = velocity;
    document.getElementById('vis').textContent = visibility;
    document.getElementById('time').textContent = timestamp;
    document.getElementById('day').textContent = daynum;
    document.getElementById('sol_lat').textContent = solar_lat;
    document.getElementById('sol_lon').textContent = solar_lon;
    document.getElementById('unit').textContent = units;

    // Update the marker position
    marker.setLatLng([latitude, longitude]);

    // Optionally, recenter the map to the new marker position
    map.setView([latitude, longitude], map.getZoom());
    
   
}
// Initialize the map when the window loads
window.onload = function() {
    initMap();
    getISS(); // Fetch data initially
    setInterval(getISS, 5000); // Fetch data every 5 seconds
};