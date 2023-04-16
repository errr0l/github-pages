// 获取所有图片
const imgList = document.querySelectorAll('img')
// 用于记录当前显示到了哪一张图片
let index = 0;
function lazyLoad() {
    // 获取浏览器视口高度,这里写在函数内部是考虑浏览器窗口大小改变的情况
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight
    for (let i=index; i<imgList.length; i++) {
        // 这里用可视区域高度减去图片顶部距离可视区域顶部的高度
        const distance = viewPortHeight - imgList[i].getBoundingClientRect().top;
        // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明图片已经出现在了视口范围内
        if (distance >= 0) {
            // 给图片赋值真实的src，展示图片
            let dataSrc = imgList[i].getAttribute('data-src');
            if (!dataSrc) {
                continue;
            }
            imgList[i].src = dataSrc;
            // 前i张图片已经加载完毕，下次从第i+1张开始检查是否需要显示
            index = i + 1;
        }
    }
}

// 定义一个防抖函数
function debounce(fn, delay = 500) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 页面加载完成执行一次lazyLoad，渲染第一次打开的网页视口内的图片
window.onload = lazyLoad;
// 监听Scroll事件，为了防止频繁调用，使用防抖函数进行优化
window.addEventListener("scroll", debounce(lazyLoad, 600));
// 浏览器窗口大小改变时重新计算
window.addEventListener("resize", debounce(lazyLoad, 600));