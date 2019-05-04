//封装一个球的对象, 他具有球的各种属性, 球的发射, 球的运动 
var Ball = function (game) {
    var image = game.imagesByName('ball');
    //得到的时一个对象 { w, h, image}
    var o = {
        x: 300,
        y: 250,
        speedX: 5,
        speedY: 5,
        fired: false,
        ...image
    };
    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x + o.w> 600) {
                o.speedX *= -1;
            }
            if (o.y < 0 || o.y + o.h> 400) {
                o.speedY *= -1;
            }
            o.x += o.speedX;
            o.y += o.speedY;
        }
    };
    o.fire = function () {
        o.fired = true;
    };
    o.rebound = function(){
        o.speedY *= -1;
    }
    return o;
};
