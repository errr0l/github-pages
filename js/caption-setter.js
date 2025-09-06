const ps = document.querySelectorAll('.content p');

// 请注意，服务端代码未更新，所以，新建和刷新功能是用不了的[202509]
function filter1(list) {
    const pattern = /^图(\d+)(?:-(\d+))?\s+/;
    for (const item of list) {
        const content = item.textContent;
        if (content && pattern.test(content)) {
            item.style = `font-size: 14px;`;
        }
    }
}
filter1(Array.from(ps));