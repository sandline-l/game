//重构文件

class TitleScene extends GuaScene {
    constructor(game){
        super(game)
        game.registerAction('b', function () {
            var scene = Scene(game);
            game.replaceScene(scene);
        });
    }
    update(){

    }
    draw(){
        this.game.ctx.fillStyle = '#554';
        this.game.ctx.fillRect(0, 0, 600, 400);
        this.game.drawScore(10, 380, 20,'#89D5FF');
        this.game.ctx.font = "40px serif";
        this.game.ctx.fillText('按 b 键开始游戏', 200, 150);
    }
   
}

//重构后, 定义一个类, 由该类来创建一个场景对象,

