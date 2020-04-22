function updateEye(eye, pointerX, pointerY) {
    var iris = $('.iris', eye)

    var minx = eye.offset().left + (iris.width() / 2) + 5;
    var maxx = eye.offset().left + eye.width() - (iris.width() / 2) - 5;
    var centerx = eye.offset().left + eye.width() / 2;
    var x = Math.max(minx, pointerX);
    x = Math.min(maxx, x);
    x = x - centerx;

    var miny = eye.offset().top + (iris.height() / 2) + 5;
    var maxy = eye.offset().top + eye.height() - (iris.height() / 2) - 5;
    var centery = eye.offset().top + eye.height() / 2;
    var y = Math.max(miny, pointerY);
    y = Math.min(maxy, y);
    y = y - centery;

    var style = 'translateX('+x+'px) translateY('+y+'px)'

    iris.css({
        '-webkit-transform': style,
        '-moz-transform': style,
        '-ms-transform': style,
        'transform': style
    });
}

function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;

    rot = -1 * gamma

    var eye = $('.eye')
    eye.css({
        '-webkit-transform': 'rotate(' + rot + 'deg)',
        '-moz-transform': 'rotate(' + rot + 'deg)',
        '-ms-transform': 'rotate(' + rot + 'deg)',
        'transform': 'rotate(' + rot + 'deg)'
    });
}

function onPermissionBtnClick() {
    $('.permission-btn').hide();
    DeviceOrientationEvent.requestPermission()
    .then(function (permissionState) {
        if (permissionState === 'granted') {
            window.addEventListener("deviceorientation", handleOrientation, true);
        } else {
            console.error("WAT?", permissionState);
        }
    }).catch(console.error);
}

$(function () {
    $("body").mousemove(function (event) {
        x = event.pageX
        y = event.pageY
        updateEye($('#left_eye'), x, y)
        updateEye($('#right_eye'), x, y)
    });

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        $('.permission-btn').show();
        $('.permission-btn').on('click', onPermissionBtnClick);
    } else if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleOrientation, true);
    }
});
