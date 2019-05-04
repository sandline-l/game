
//对拖拽功能的封装, 需求是, 传入一个被拖拽的对象,就可以给该对象赋予拖拽功能
//该拖拽对象的位置是 x , y  
function drag(dom) {
    // 判断点是否在球里面
    var pointInBall = function (x, y, b) {
        var xin = x > b.x && x < b.x + b.w;
        var yin = y > b.y && y < b.y + b.h;
        return xin && yin;
    };
    //拖拽球的功能
    function mouseEvent(event) {
        //获取鼠标的坐标
        var x = event.offsetX;
        var y = event.offsetY;
        //判断是否点在了球里面,(是否选中球)
        if (pointInBall(x, y, dom)) {
            //可以拖动
            enabledrag = true;
        }
        document.addEventListener('mousemove', mousemoveEvent);
    }
    function mousemoveEvent(event) {
        if (enabledrag) {
            dom.x = event.offsetX;
            dom.y = event.offsetY;
        }
    }
    document.addEventListener('mousedown', mouseEvent);
    document.addEventListener('mouseup', function () {
        enabledrag = false;
    });
}




