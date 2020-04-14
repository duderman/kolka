function updateEye(eye, pointerX, pointerY) {
  var x = (eye.offset().left) + (eye.width() / 2);
  var y = (eye.offset().top) + (eye.height() / 2);
  var rad = Math.atan2(pointerX - x, pointerY - y);
  var rot = (rad * (180 / Math.PI) * -1) + 180;
  eye.css({
    '-webkit-transform': 'rotate(' + rot + 'deg)',
    '-moz-transform': 'rotate(' + rot + 'deg)',
    '-ms-transform': 'rotate(' + rot + 'deg)',
    'transform': 'rotate(' + rot + 'deg)'
  });
}
$(function () {
  $("body").mousemove(function(event) {
    x = event.pageX
    y = event.pageY
    updateEye($('#left_eye'), x, y)
    updateEye($('#right_eye'), x, y)
  });
});
