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
        log(fps)
    })

}




//来一个主函数 
var __main = function () {
    enableDebugMode(true)

    //game 对象
    var game = guaGame(30);
    var pannel = Pannel();
    var ball = Ball()


    //设置砖块, 关卡
    var setLevel = function (n) {
        var n = n - 1;
        blockArr = []
        levels[n].forEach(function (item) {
            var b = Block(item);
            blockArr.push(b)
        })
    }
    setLevel(1)
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

    //更新函数是在定时器里面,会不断的被执行
    game.update = function () {
        if (window.pause) {
            return
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
            }
        })
    }
    // 画图
    game.draw = function () {
        game.drawImage(pannel)
        game.drawImage(ball)
        //如果砖块有live,就绘制
        blockArr.forEach(function (item, index) {
            if (item.live) {
                game.drawImage(item)
            }
        })
    }
}

__main()