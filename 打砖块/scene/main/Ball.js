//封装一个球
var Ball = function (game) {
    var image = game.imagesByName('ball');
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
            if (o.x < 0 || o.x > 600) {
                o.speedX *= -1;
            }
            if (o.y < 0 || o.y > 400) {
                o.speedY *= -1;
            }
            o.x += o.speedX;
            o.y += o.speedY;
        }
    };
    o.fire = function () {
        o.fired = true;
    };
    return o;
};
