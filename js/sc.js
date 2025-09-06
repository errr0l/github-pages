const wrapper = document.querySelector('#header #sc-box .wrapper');

function makeSideCard(list, opts) {
    const { title, showingDate, dateName } = opts;
    const sc = document.createElement('div');
    sc.className = "side-card b-s-1 mg-b-10";
    let html = "<div class='wrapper'><h2 class='item title'><span>"+ title +"</span></h2>";
    html += "<div class='item content'>";
    for (const item of list) {
        html += "<div class='item1' style='word-break: break-all;'>";
        let content;
        if (showingDate) {
            content = `${item[dateName]} ${item.title}`;
        }
        else {
            content = item.title
        }
        html += `<a href='${item.url}'>${content}</a>`;
        html += "</div>";
    }
    html += "</div>";
    html += "</div>";
    sc.innerHTML = html;
    return sc;
}

const latestSideCard = makeSideCard(latest, {
    title: "最近更新",
    showingDate: true,
    dateName: "updatedAt"
});

wrapper.appendChild(latestSideCard);