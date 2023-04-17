function search(value) {
    let r = [];
    for (let item of dataList || []) {
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

let baseHref = window.location.href.replace(/(articles\/)(.*)/, '$1')
let searchInput = document.querySelector("#search-input");
let searchResult;
if (searchInput) {
    searchResult = document.querySelector("#search-result");
    let content = searchResult.querySelector('.content');
    let wrap = debounce(function() {
        let value = searchInput.value;
        if (value) {
            let list = search(value);
            let html = "";
            if (list.length > 0) {
                html += "<ul>";
                for (let item of list) {
                    let href = baseHref + item.fileName;
                    html += "<li class='item' title='"+ item.original +"'>";
                    html += "<a class='hover-1' href='"+ href +"'>" + item.title + "</a>";
                    html += "</li>"
                }
                html += "</ul>";
            }
            else {
                html += "<div>搜索不到数据:|</div>";
            }
            content.innerHTML = html;
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
}

searchResult.addEventListener('click', function(e) {
    e.stopPropagation();
});

window.addEventListener('click', function () {
    if (searchResult && searchResult.style.display === 'block') {
        searchResult.style.display = "none";
    }
});

window.addEventListener('beforeunload', function () {
    searchInput = null;
    searchResult = null;
});

