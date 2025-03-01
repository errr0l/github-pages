
let searchInput = document.querySelector("#search-input");
let searchIcon = document.querySelector("#search .search-icon");
let searchResult = document.querySelector("#search-result");
let content = searchResult.querySelector('.content');
let prefix = searchInput.getAttribute('data-prefix');

// 文本搜索方法，并将文本添加高亮效果
function search(value) {
    let r = [];
    for (let item of all || []) {
        let reg = new RegExp('(' + value + ')', 'i');
        if (reg.test(item.title)) {
            let title = item.title.replace(reg, "<span style='color: var(--c-1);'>$1</span>");
            let _item = {
                fileName: item.fileName,
                tag: item.tag,
                title: title,
                categoryName: item.categoryName,
                original: item.title
            };
            r.push(_item);
        }
    }
    return r;
}

let render = function(val, ele, prefix) {
    let list = search(val);
    let html = "";
    if (list.length > 0) {
        html += "<ul>";
        for (let item of list) {
            let href = prefix + item.fileName;
            html += "<li class='item' title='"+ item.original +"'>";
            html += "<a class='hover-1' href='"+ href +"'>" + item.title + "</a>";
            html += "</li>"
        }
        html += "</ul>";
    }
    else {
        html += "<div>搜索不到数据:|</div>";
    }
    ele.innerHTML = html;
}

let wrap = debounce(function() {
    let value = searchInput.value;
    if (value) {
        render(value, content, prefix);
        searchResult.style.display = "block";
    }
    else {
        if (searchResult.style.display === 'block') {
            searchResult.style.display = "none";
        }
    }
});

searchInput.addEventListener('input', wrap);
searchInput.addEventListener('focus', wrap);
let obj = window.getComputedStyle(searchInput);
searchIcon.addEventListener("click", function(e) {

    // 如果是宽屏状态，则不执行以下逻辑
    if (obj.display === "block") {
        return;
    }
    let mask = document.querySelector("#mask-2");
    if (!mask) {
        mask = document.createElement('div');
        mask.id = "mask-2";
        mask.className = "mask";
        document.body.appendChild(mask);
        mask.addEventListener('click', function () {
            searchResult.style.display = "none";
            mask.style.display = "none";
        });
    }
    if (searchResult.style.display && searchResult.style.display === "block") {
        searchResult.style.display = "none";
        mask.style.display = "none";
    }
    else {
        searchResult.style.display = "block";
        mask.style.display = "block";
    }
});

// 点击其他以外的地方时，隐藏当前搜索结果
searchResult.addEventListener('click', function(e) {
    e.stopPropagation();
});

if (obj.display === "none") {
    let searchInput2 = document.querySelector("#search-input-2");
    let wrap4Input2 = debounce(function() {
        let value = searchInput2.value;
        if (value) {
            render(value, content, prefix);
        }
        else {
            content.innerHTML = "";
        }
    });
    searchInput2.addEventListener("input", wrap4Input2);
    searchInput2.addEventListener("focus", wrap4Input2);
}

// window.addEventListener('beforeunload', function () {
//     searchInput = null;
//     searchResult = null;
// });