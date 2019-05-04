//辅助函数,放到这里面
let log = console.log.bind(console)

// //碰撞函数
// var hit = function (a,b) {
//     var o = a;
//     if (b.y < o.y + o.image.height && b.y > o.y) {
//         if (b.x > o.x && b.x < o.x + o.image.width) {
//             log('相撞')
//             return true
//         }
//     }
//     return false
// }
//封装一个创建image 的方法
var imageFromPath = function (imageUrl) {
    let image = new Image();
    image.src = imageUrl
    return image
}
// 图片预加载
var preloadImage = function (url) {
    return new Promise(function (res, rej) {
        var img = new Image();
        img.onload = function () {
            res(img)
        }
        img.src = url
    })
}




