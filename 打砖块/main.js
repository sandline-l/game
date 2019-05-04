var fps;
//调式用函数
var enableDebugMode = function (enable) {
    if (!enable) {
        return
    }
    //增加暂停,是的球的运动暂停
    //绑定按键来切换关卡
    window.pause = false;
    window.addEventListener('keydown', function (event) {
        var k = event.key;
        if (k == 'p') {
            window.pause = !window.pause
        }
        if ('1234567'.includes(k)) {
            setLevel(Number(k))
        }
    })
    //控制小球的速度
    document.getElementById('id-speed-contral').addEventListener('input', function (event) {
        window.fps = Number(this.value)
        // log(fps)
    })

}
var enabledrag = false;
//来一个主函数 
var __main = function () {
    enableDebugMode(true)
    //images对象存了图片的url
    var images = {
        block: './img/block.png',
        ball: './img/ball.png',
        pannel: './img/paddle.png'
    }

    //game 对象
    var game = new GuagameScene(30, images, function (game) {
        var titleScene = new TitleScene(game)
        titleScene.test()
        game.replaceScene(titleScene)
        // var pannel = Pannel(game);
        // var ball = Ball(game)
        // // 判断点是否在球里面
        // var pointInBall = function (x, y, b) {
        //     var xin = x > b.x && x < b.x + b.w
        //     var yin = y > b.y && y < b.y + b.h
        //     return xin && yin
        // }
        // //拖拽球的功能
        // function mouseEvent(event) {
        //     //获取鼠标的坐标
        //     var x = event.offsetX;
        //     var y = event.offsetY;
        //     //判断是否点在了球里面,(是否选中球)
        //     if (pointInBall(x, y, ball)) {
        //         //可以拖动
        //         enabledrag = true;
        //     }
        //     document.addEventListener('mousemove', mousemoveEvent)
        // }
        // function mousemoveEvent(event) {
        //     if (enabledrag) {
        //         ball.x = event.offsetX;
        //         ball.y = event.offsetY
        //     }
        // }
        // document.addEventListener('mousedown', mouseEvent)
        // document.addEventListener('mouseup', function () {
        //     enabledrag = false;
        // })
        //设置砖块, 关卡
        setLevel = function (n) {
            var n = n - 1;
            blockArr = []
            levels[n].forEach(function (item) {
                var b = Block(item, game);
                blockArr.push(b)
            })
        }
        // var scene = Scene(game)
        // var overScene = SceneEnd(game)
        //    log(scene)
        setLevel(1)
        //给按键注册事件,按下d , 挡板右移动
        // game.registerAction('d', function () {
        //     pannel.rightMove()
        // })
        // //给按键注册事件,按下a , 挡板左移动
        // game.registerAction('a', function () {
        //     pannel.leftMove()
        // })
        // game.registerAction('f', function () {
        //     ball.fire()
        // })

        //更新函数是在定时器里面,会不断的被执行
        game.update = function (over) {
           
            game.scene.update()
            // if (window.pause) {
            //     return
            // }
            // ball.move()
            // //如果相撞,让ball的速度取反
            // if (pannel.collide(ball)) {
            //     ball.speedY *= -1
            // }
            // //如果球和砖块相撞
            // blockArr.forEach(function (item) {
            //     if (item.collide(ball)) {
            //         item.kill()
            //         ball.speedY *= -1
            //         //球和砖块相撞后,更改分数
            //         game.score += 100
            //     }
            // })
        }
        // 画图
        game.draw = function () {
            game.scene.draw()
            // game.ctx.fillStyle = '#554'
            // game.ctx.fillRect(0, 0, 600, 400)
            // game.drawImage(pannel)
            // game.drawImage(ball)
            // game.drawScore(10, 380, 20)
            // //如果砖块有live,就绘制
            // blockArr.forEach(function (item, index) {
            //     if (item.live) {
            //         game.drawImage(item)
            //     }
            // })
        }
    });

}
__main()