//抽离场景, 在某个场景里面 ,画什么内容, 绑定什么事件, 返回的是场景对象，

var Scene = function (game) {
    var scene = {
        game: game,
    }
    var pannel = Pannel(game);
    var ball = Ball(game)
    //场景跟新
    scene.update = function () {
        if (window.pause) {
            return
        }
        //判断是否游戏结束
        if (ball.y > 400) {
            var over = true;
            //游戏结束， 加载结束场景，并替换
            var overScene = SceneEnd(game)
            // game.update(over)
            game.replaceScene(overScene)
        }
        ball.move()
        //如果相撞,让ball的速度取反
        if (pannel.collide(ball)) {
            ball.speedY *= -1
        }
        //如果球和砖块相撞
        blockArr.forEach(function (item) {
            if (item.collide(ball)) {
                item.kill()
                ball.speedY *= -1
                //球和砖块相撞后,更改分数
                game.score += 100
            }
        })

    }
    // 判断点是否在球里面
    var pointInBall = function (x, y, b) {
        var xin = x > b.x && x < b.x + b.w
        var yin = y > b.y && y < b.y + b.h
        return xin && yin
    }
    //拖拽球的功能
    function mouseEvent(event) {
        //获取鼠标的坐标
        var x = event.offsetX;
        var y = event.offsetY;
        //判断是否点在了球里面,(是否选中球)
        if (pointInBall(x, y, ball)) {
            //可以拖动
            enabledrag = true;
        }
        document.addEventListener('mousemove', mousemoveEvent)
    }
    function mousemoveEvent(event) {
        if (enabledrag) {
            ball.x = event.offsetX;
            ball.y = event.offsetY
        }
    }
    document.addEventListener('mousedown', mouseEvent)
    document.addEventListener('mouseup', function () {
        enabledrag = false;
    })
    //给按键注册事件,按下d , 挡板右移动
    game.registerAction('d', function () {
        pannel.rightMove()
    })
    //给按键注册事件,按下a , 挡板左移动
    game.registerAction('a', function () {
        pannel.leftMove()
    })
    game.registerAction('f', function () {
        ball.fire()
    })

    scene.draw = function () {
        game.ctx.fillStyle = '#554'
        game.ctx.fillRect(0, 0, 600, 400)
        game.drawImage(pannel)
        game.drawImage(ball)
        game.drawScore(10, 380, 20)
        //如果砖块有live,就绘制
        blockArr.forEach(function (item, index) {
            if (item.live) {
                game.drawImage(item)
            }
        })
    }
    return scene
}