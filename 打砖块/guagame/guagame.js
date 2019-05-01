//对guagame的重构, 将对象自身的属性放到constructor里面
//其实很简单,将要对自身的引用使用this替代, 
//在 事件绑定和定时器中, 预存一个this
//需要在创建对象的时候就执行的代码 ,也放在constructor里面,
class GuagameScene {
    constructor(fps, images, runcallback) {
        window.fps = 30;
        this.keydowns = {};
        this.active = {}
        this.images = {}
        this.scene = null
        this.canvas = document.getElementById('m-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0
        //按下按键,启动事件
        var self = this
        window.addEventListener('keydown', function (event) {
            self.keydowns[event.key] = true;
        });
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = false;
        });

        //加载所有图片之后，再运行开始代码, 并将加载的图片保存到g.images里面
        var names = Object.keys(images);
        var proArr = [];
        names.forEach((item) => {
            var pro = preloadImage(images[item]);
            proArr.push(pro);
            pro.then((img) => {
                this.images[item] = img;
            });
        });
        Promise.all(proArr).then(() => {
            this.run(runcallback);
        });
    }

    drawImage(guaImage) {
        this.ctx.drawImage(guaImage.image, guaImage.x, guaImage.y);
    }
    registerAction(key, callback) {
        this.active[key] = callback;
    }
    drawScore(x, y, fontSize='35',color='red') {
        this.ctx.font = fontSize + "px serif";
        this.ctx.fillStyle = color;
        this.ctx.fillText('分数: ' + this.score, x, y);
    }
    replaceScene(scene) {
        this.scene = scene;
    }
    imagesByName(name) {
        var img = this.images[name];
        var img = {
            image: img,
            w: img.width,
            h: img.height,
        };
        return img;
    }

    moveloop() {
        var active = Object.keys(this.active);
        //循环监听被注册事件的按键,如果按键被按下,执行回调函数
        for (var i = 0; i < active.length; i++) {
            var key = active[i];
            if (this.keydowns[key]) {
                this.active[key]();
            }
        }
        //更新
        this.update();
        //在该计时器里面,最后是不断的清空画布,和画图, 
        //所以在pannel对象里面的左右移动的方法里面,只需要更改image的位置就可以了
        this.ctx.clearRect(0, 0, 600, 400);
        //画图
        this.draw();
        //迭代,循环调用
        var self = this
        setTimeout(function () {
            self.moveloop();
        }, 1000 / window.fps);
    }

    run(runcallback) {
        var self = this
        setTimeout(function () {
            runcallback(self);
            self.moveloop();
        }, 1000 / window.fps);
    }

}





















