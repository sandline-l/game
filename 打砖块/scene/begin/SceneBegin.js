//抽离场景, 在某个场景里面 ,画什么内容, 绑定什么事件, 
var SceneBegin = function (game) {
    var scene = {
        game: game,
    };
    game.registerAction('b', function () {
        var scene = Scene(game);
        game.replaceScene(scene);
    });
    scene.update = function () {
    };
    scene.draw = function () {
        game.ctx.fillStyle = '#554';
        game.ctx.fillRect(0, 0, 600, 400);
        game.drawScore(10, 380, 20);
        game.ctx.font = "40px serif";
        game.ctx.fillText('按 b 键开始游戏', 200, 150);
    };
    return scene;
};

//重构前 , 是一个函数, 返回一个对象, 目的是创建一个场景对象
//该场景对象, 可以绘制自己的场景, 更新数据,  并且在该场景里面绑定一个按键事件, 触发事件,更换场景
//因为场景对象里面要使用到game对象的方法, 所以将game对象作为参数传递给该场景对象,
//使得场景对象的一个属性的属性值 为game对象





