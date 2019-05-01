//重构文件

class OverScene extends GuaScene {
    constructor(game){
        super(game)
        game.registerAction('g', function () {
            var scene = Scene(game);
            game.replaceScene(scene);
        });
    }
    draw(){
        this.game.ctx.fillStyle = '#554';
        this.game.ctx.fillRect(0, 0, 600, 400);
        this.game.drawScore(10, 380, 20,'#89D5FF');
        this.game.ctx.font = "25px serif";
        this.game.ctx.fillText('gameover,按g键重新开始游戏', 200, 150);
    }
    update(){

    }
}





