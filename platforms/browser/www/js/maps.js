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

            var coordsElem = document.querySelector('#coords');
            coordsElem.innerHTML = 'Lat: ' + pos.coords.latitude + ' Lon: ' + pos.coords.longitude;
        },
        coordsErrorHandler = function (err) {
            console.log(err.code + ' ' + err.message);
        }
    ;

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            init();
        });

        document.addEventListener('deviceready', function () {
            onDeviceReady();
        });
    }
})();