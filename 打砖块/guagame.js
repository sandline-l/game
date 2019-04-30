//创建一个 g 游戏对象 , 他有 canvas , 有画图方法draw , 
var guaGame = function (fps) {
    var g = {
        keydowns: {},
        active: {},
    }
    //创建一个canvas
    var canvas = document.getElementById('m-canvas');
    var ctx = canvas.getContext('2d');
    g.canvas = canvas
    g.ctx = ctx
    //draw
    g.drawImage = function (guaImage) {
        g.ctx.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    //按下按键,启动事件
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true;
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false;
    })

    //功能是,给某一个按键注册一个函数
    g.registerAction = function (key, callback) {
        g.active[key] = callback
    }
    window.fps = 30
    g.moveloop = function(){
        // log(window.fps)
        var active = Object.keys(g.active)
        //循环监听被注册事件的按键,如果按键被按下,执行回调函数
        for (var i = 0; i < active.length; i++) {
            var key = active[i];
            if (g.keydowns[key]) {
                g.active[key]()
            }
        }
        g.update()
        //在该计时器里面,最后是不断的清空画布,和画图, 
        //所以在pannel对象里面的左右移动的方法里面,只需要更改image的位置就可以了
        g.ctx.clearRect(0, 0, 600, 400);
        g.draw()
        //迭代,循环调用
        setTimeout(function () {
            g.moveloop()
        }, 1000 / window.fps)
    }

    setTimeout(function () {
        g.moveloop()
    }, 1000 / window.fps)
    return g
}

//为啥要用window.fps才可以? 而且一开始打印的window.fps 是 undefined

