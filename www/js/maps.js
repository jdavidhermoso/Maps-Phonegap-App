(function () {
    var init = function () {
            initFastClick();
        },
        initFastClick = function () {
            FastClick.attach(document.body);
        };

    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function () {
            init();
        });
    }
})();