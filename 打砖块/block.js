  //封装一个砖块 , position 是传入的参数,代表了level里每一关卡的一个成员
  var Block = function (position) {
      var p = position;
    var image = imageFromPath('./block2.png')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        h: 15,
        w: 100,
        live: true,
        health: p[2] || 1
    }
    o.kill = function () {
        o.health--
        if(o.health<1){
            o.live = false
        }
    }

    o.collide = function (ball) {
       return o.live && (hit(ball,o) || hit(o,ball))
    }
    return o
}