   //封装, 一个挡板对象,pannel
   var Pannel = function (game) {
    // var image = imageFromPath('./paddle.png')
    var image = game.imagesByName('pannel')
    var o = {
        x: 300,
        y: 300,
        speed: 10,
        ...image,
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
    //判断a 是不是在b里面,目前还没有image的w 和 h ,所以先用原来的
    var aInb = function (a,b,){
          var xin = a.x>b.x && a.x< b.x+b.w 
          var yin = a.y>b.y && a.y< b.y+b.h
          return xin && yin
    }
    //判断球是否和挡板相撞,也就是判断两个矩形是否相交 , 如果相撞,返回true,否则返回false
    o.collide = function (ball) {
        if(aInb(ball,o) || aInb(o,ball) ){
            return true
        }
        return false
    }
    return o
}