  //封装一个球
  var Ball = function () {
    var image = imageFromPath('./ball.png')
    var o = {
        image: image,
        x: 300,
        y: 250,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x > 600) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y > 400) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function () {
        o.fired = true
    }
    
    // o.speedContral = function(speed){
    //     o.speedX+= Math.ceil(speed/10) 
    //     o.speedY+= Math.ceil(speed/10) 
    // }
    return o
}