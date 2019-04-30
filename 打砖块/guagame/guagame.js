//创建一个 g 游戏对象 , 他有 canvas , 有画图方法draw , 
var guaGame = function (fps, images, runcallback) {
    var g = {
        keydowns: {},
        active: {},
        images: {},
        scene:null,
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
    //分数声明, 画分数的函数, x,y 位置坐标, fontSize,字号大小
    g.score = 0;
    g.drawScore = function (x, y, fontSize) {
        // log('score')
        g.ctx.font = fontSize + "px serif";
        g.ctx.fillStyle = 'red'
        g.ctx.fillText('分数: ' + g.score, x, y);
    }
    //改变场景
    g.replaceScene = function(scene){
        g.scene = scene;
    }

    //加载所有图片之后，再运行开始代码, 并将加载的图片保存到g.images里面
    var names = Object.keys(images);
    var proArr = []
    names.forEach((item) => {
        var pro = preloadImage(images[item])
        proArr.push(pro)
        pro.then((img) => {
            g.images[item] = img
        })
    })
    Promise.all(proArr).then(() => {
        g.run()
    })

    //通过图片名字，获取图片对象
    g.imagesByName = function (name) {
        var img = g.images[name]
        var img = {
            image: img,
            w: img.width,
            h: img.height,
        }
        return img
    }
    window.fps = 30
    //循环函数
    g.moveloop = function () {
        // log(window.fps)
        var active = Object.keys(g.active)
        //循环监听被注册事件的按键,如果按键被按下,执行回调函数
        for (var i = 0; i < active.length; i++) {
            var key = active[i];
            if (g.keydowns[key]) {
                g.active[key]()
            }
        }
        //更新
        g.update()
        //在该计时器里面,最后是不断的清空画布,和画图, 
        //所以在pannel对象里面的左右移动的方法里面,只需要更改image的位置就可以了
        g.ctx.clearRect(0, 0, 600, 400);
        //画图
        g.draw()
        //迭代,循环调用
        setTimeout(function () {
            g.moveloop()
        }, 1000 / window.fps)
    }
    g.run = function () {
        setTimeout(function () {
            runcallback(g)
            g.moveloop()
        }, 1000 / window.fps)
    }

    return g
}

//为啥要用window.fps才可以? 而且一开始打印的window.fps 是 undefined

