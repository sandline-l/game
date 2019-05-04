//封装一个砖块 , position 是传入的参数,代表了level里每一关卡的一个成员
//砖块具有自己的位置属性,生命值,是否存活, 是否于球相撞, 
var Block = function (position, game) {
    var p = position;
    // var image = imageFromPath('./block.png')
    var image = game.imagesByName('block')
    var o = {
        x: p[0],
        y: p[1],
        // h: 15,
        // w: 100,
        live: true,
        health: p[2] || 1,
        ...image,
    }
    o.kill = function () {
        o.health--
        if (o.health < 1) {
            o.live = false
        }
    }
    //碰撞函数,判断b 在 a里面
    var hit = function (a, b) {
        var o = a;
        if (b.y < o.y + o.image.height && b.y > o.y) {
            if (b.x > o.x && b.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    o.collide = function (ball) {
        return o.live && (hit(ball, o) || hit(o, ball))
    }
    return o
}