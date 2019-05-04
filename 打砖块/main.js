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
        game.replaceScene(titleScene)
       
        //设置砖块, 关卡
        setLevel = function (n) {
            var n = n - 1;
            blockArr = []
            levels[n].forEach(function (item) {
                var b = Block(item, game);
                blockArr.push(b)
            })
            return blockArr;
        }
      
        setLevel(1)

        //更新函数是在定时器里面,会不断的被执行
        // game.update = function (over) {
        //     game.scene.update()
           
        // }
        // 画图
        // game.draw = function () {
        //     game.scene.draw()
           
        // }
    });

}
__main()