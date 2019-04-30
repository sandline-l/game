//抽离场景, 在某个场景里面 ,画什么内容, 绑定什么事件, 

var SceneBegin = function (game) {
    var scene = {
        game: game,
    }
    game.registerAction('b', function () {
        var scene = Scene(game)
        game.replaceScene(scene)
    })
    scene.update = function () {
    }
    scene.draw = function () {
        game.ctx.fillStyle = '#554'
        game.ctx.fillRect(0, 0, 600, 400)
        game.drawScore(10, 380, 20)
        game.ctx.font = "40px serif";
        game.ctx.fillText('按 b 键开始游戏', 200, 150);

    }
    return scene
}