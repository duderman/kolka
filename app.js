var initialG
var initialB
var mouseMoveDisabled = false

function updateEye(eye, pointerX, pointerY) {
    var iris = $('.iris', eye)

    var minx = eye.offset().left + (iris.width() / 2) + 10;
    var maxx = eye.offset().left + eye.width() - (iris.width() / 2) - 10;
    var centerx = eye.offset().left + eye.width() / 2;
    var x = Math.max(minx, pointerX);
    x = Math.min(maxx, x);
    x = x - centerx;

    var miny = eye.offset().top + (iris.height() / 2) + 10;
    var maxy = eye.offset().top + eye.height() - (iris.height() / 2) - 10;
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
    var gamma = event.gamma;
    if (!initialG) {
        initialG = gamma
    }
    var deltaG = initialG - gamma

    var beta = event.beta;
    if (!initialB) {
        initialB = beta
    }
    var deltaB = initialB - beta

    var eye = $('.ball')
    var iris = $('.iris')

    var maxDelta = eye.width() / 2 - iris.width() / 2 - 10

    var x = Math.max(deltaG, -1 * maxDelta)
    x = Math.min(x, maxDelta)

    var y = Math.max(deltaB, -1 * maxDelta)
    y = Math.min(y, maxDelta)

    var style = 'translateX('+x+'px) translateY('+y+'px)'

    iris.css({
        '-webkit-transform': style,
        '-moz-transform': style,
        '-ms-transform': style,
        'transform': style
    });
}

function onPermissionBtnClick() {
    $('.permission-btn').addClass('hidden');
    DeviceOrientationEvent.requestPermission()
    .then(function (permissionState) {
        if (permissionState === 'granted') {
            window.addEventListener("deviceorientation", handleOrientation, true);
        } else {
            mouseMoveDisabled = false
            console.error("WAT?", permissionState);
        }
    })
    .catch(function(error) {
        console.error(error);
        mouseMoveDisabled = false;
    });
}

function onMouseMove(event) {
    if (mouseMoveDisabled) { return true }

    updateEye($('#left_eye'), event.pageX, event.pageY);
    updateEye($('#right_eye'), event.pageX, event.pageY);
}


$(function () {
    $("body").mousemove(onMouseMove);

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        mouseMoveDisabled = true
        btn = $('.permission-btn')
        btn.removeClass('hidden');
        btn.one('click', onPermissionBtnClick);
        x = btn.offset().left + btn.width() / 2
        y = btn.offset().top
        updateEye($('#left_eye'), x, y);
        updateEye($('#right_eye'), x, y);
    } else if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleOrientation, true);
    }
});
