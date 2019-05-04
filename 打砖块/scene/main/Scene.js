//抽离场景, 在某个场景里面 ,画什么内容, 绑定什么事件, 返回的是场景对象，
var Scene = function (game) {
    var scene = {
        game: game,
    };
    //在场景里面引入动画对象
    var pannel = Pannel(game);
    var ball = Ball(game);
    //场景跟新
    scene.update = function () {
        if (window.pause) {
            return;
        }
        //判断是否游戏结束
        if (ball.y + ball.h> 400) {
            //游戏结束， 加载结束场景，并替换
            var overScene = new OverScene(game);
            // game.update(over)
            game.replaceScene(overScene);
        }
        ball.move();
        //如果相撞
        if (pannel.collide(ball)) {
            //球反弹
            ball.rebound()
        }
        //如果球和砖块相撞,减少砖块的生命值, 并且速度取反,分数加100
        blockArr.forEach(function (item) {
            if (item.collide(ball)) {
                item.kill();
                ball.speedY *= -1;
                //球和砖块相撞后,更改分数
                game.score += 100;
            }
        });
    };
    //传入对象,给他赋予拖拽功能
    drag(ball)
  
    //给按键注册事件,按下d , 挡板右移动
    game.registerAction('d', function () {
        pannel.rightMove();
    });
    //给按键注册事件,按下a , 挡板左移动
    game.registerAction('a', function () {
        pannel.leftMove();
    });
    //注册f键, 控制球发射
    game.registerAction('f', function () {
        ball.fire();
    });
    //场景绘制,清空画布,画球,挡板,砖块,分数
    scene.draw = function () {
        game.ctx.fillStyle = '#554';
        game.ctx.fillRect(0, 0, 600, 400);
        game.drawImage(pannel);
        game.drawImage(ball);
        game.drawScore(10, 380, 20);
        //如果砖块有live,就绘制
        blockArr.forEach(function (item) {
            if (item.live) {
                game.drawImage(item);
            }
        });
    };
    return scene;
};
