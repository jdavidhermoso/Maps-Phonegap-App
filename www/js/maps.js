(function () {
    var init = function () {
            initFastClick();
        },
        initFastClick = function () {
            FastClick.attach(document.body);
        },
        onDeviceReady = function () {
            navigator.geolocation.getCurrentPosition(paintCoords, coordsErrorHandler)
        },
        paintCoords = function (pos) {
            var myMap = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);

            onMapLoaded();

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.pirates',
                accessToken: 'pk.eyJ1IjoiamRhdmlkaGVybW9zbyIsImEiOiJjamF1eDZzMXU2bmN2MzJxZTVzcTR0MTNuIn0.9xsIQGVMQo_G6gvzVDzoMg',
            }).addTo(myMap);

            paintMarker([pos.coords.latitude, pos.coords.longitude], 'Hey! I am here', myMap);

            paintCircle([pos.coords.latitude, pos.coords.longitude], myMap);

            myMap.on('click', function (evt) {
                var text = 'Marker in l(' + evt.latlng.lat.toFixed(2) + ') and L(' + evt.latlng.lng.toFixed(2) + ')';
                paintMarker(evt.latlng, text, myMap);
            });
        },

        coordsErrorHandler = function (err) {
            console.log(err.code + ' ' + err.message);
        },

        paintMarker = function (latLng, text, map) {
            var marker = L.marker(latLng).addTo(map);
            marker.bindPopup(text).openPopup();

        },

        onMapLoaded = function () {
            var loadingMsg = document.querySelector('#loadingMsg'),
                map = document.querySelector('#map');

            loadingMsg.classList.add('hide');
            loadingMsg.classList.remove('show');
            map.classList.add('show');
            map.classList.remove('hide');
        },

        paintCircle = function (latLng, map) {
            var circle = L.circle(latLng, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map);
        };

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            init();
        }, false);

        document.addEventListener('deviceready', function () {
            onDeviceReady();
        }, false);
    }
})();