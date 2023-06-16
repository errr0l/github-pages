var imgList = document.querySelectorAll('img');
var imgMap = {};

if (imgList && imgList.length) {
    for (var i=0; i<imgList.length; i++) {
        var item = imgList[i];
        var dataSrc = item.getAttribute('data-src');
        if (!dataSrc) {
            continue;
        }
        // 如果有其父节点display为none，则不加载（媒体查询处隐藏的，但只能控制其父，若是父的父元素就没有办法了，还得继续加逻辑判断）
        var cssObj = window.getComputedStyle(item.parentNode);
        if (cssObj && cssObj.display === 'none') {
            continue;
        }
        imgMap[i] = {
            img: item,
            dataSrc: dataSrc,
            key: i
        };
    }
}

function getUnhandled() {
    var imgList = [];
    for (var key in imgMap) {
        imgList.push(imgMap[key]);
    }
    return imgList;
}

function lazyLoad() {
    // 获取浏览器视口高度,这里写在函数内部是考虑浏览器窗口大小改变的情况
    var unhandled = getUnhandled();
    if (unhandled.length) {
        var viewPortHeight = window.innerHeight || document.documentElement.clientHeight;
        for (var i=0; i<unhandled.length; i++) {
            var item = unhandled[i];
            // 这里用可视区域高度减去图片顶部距离可视区域顶部的高度
            var distance = viewPortHeight - item.img.getBoundingClientRect().top;
            // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明图片已经出现在了视口范围内
            if (distance >= 0) {
                // 给图片赋值真实的src，展示图片
                item.img.src = item.dataSrc;
                delete imgMap[item.key];
            }
        }
    }
}

// 定义一个防抖函数
function debounce(fn, delay) {
    if (!delay) {
        delay = 500;
    }
    var timer = null;
    return function () {
        if (timer) clearTimeout(timer);
        var _args = arguments;
        var that = this;
        timer = setTimeout(function () {
            fn.apply(that, _args);
        }, delay);
    };
}

// 页面加载完成执行一次lazyLoad，渲染第一次打开的网页视口内的图片
window.onload = lazyLoad;
// 监听Scroll事件，为了防止频繁调用，使用防抖函数进行优化
window.addEventListener("scroll", debounce(lazyLoad, 600));
// 浏览器窗口大小改变时重新计算
window.addEventListener("resize", debounce(lazyLoad, 600));