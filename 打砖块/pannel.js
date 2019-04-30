   //封装, 一个挡板对象,pannel
   var Pannel = function () {
    var image = imageFromPath('./paddle.png')
    var o = {
        image: image,
        x: 300,
        y: 300,
        speed: 10,
    }
    //挡板的左右移动
    o.leftMove = function () {
        o.x -= o.speed
        if (o.x < 0) {
            o.x = 0
        }
    }
    o.rightMove = function () {
        o.x += o.speed
        if (o.x > 600 - o.image.width) {
            o.x = 600 - o.image.width
        }
    }
    //判断球是否和挡板相撞,也就是判断两个矩形是否相交 , 如果相撞,返回true,否则返回false
    o.collide = function (ball) {
        if (ball.x > o.x && ball.x < o.x + o.image.width) {
            if (ball.y + ball.image.height > o.y) {
                return true
            }
        }
        return false
    }
    return o
}