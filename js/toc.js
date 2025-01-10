// 获取当前节点的子节点；
// 规则：以markdown中h标签的排列为准，第一个与第二个进行比较，若第二个标签比第一个小，则第二个为第一个的子节点；
// 如[h2, h3, h3, h4]中，两个h3为h2的子节点，h4为第二个h3的子节点，应该生成如下数据：
// [{h2, children: [{h3}, {h3, chilren: [h4]}]}]
function generateTree(nodes) {
    const tree = [];
    while (nodes.length > 0) {
        const current = nodes.pop();
        current.level = 1;
        tree.push({
            text: current._node.textContent,
            children: makeChildren(current, nodes),
            ...current
        });
    }
    return tree;
}

function makeChildren(current, nodes) {
    const children = [];
    while (nodes.length > 0) {
        const node = nodes[nodes.length - 1];
        // 遇到大于当前节点的节点时，结束循环
        if (node.num <= current.num) {
            return children;
        }
        // 移除节点
        nodes.pop();
        node.level = current.level + 1;
        children.push({
            text: node._node.textContent,
            children: makeChildren(node, nodes),
            ...node
        });
    }
    return children;
}

function makeToc(tree) {
    const sc = document.createElement('div');
    sc.className = "side-card b-s-1 mg-b-10";
    sc.id = "toc";
    let html = "<div class='wrapper'><h2 class='item title'><span>目录</span></h2>";
    html += "<div class='item content'>";
    for (const node of tree) {
        html += "<div class='item1 lv-1' style='word-break: break-all;'>";
        html += `<a href='#${node._node.id}'>${node.text}</a>`;
        html += "</div>";
        html += makeToc2(node);
    }
    html += "</div>";
    html += "</div>";
    sc.innerHTML = html;
    return sc;
}

function makeToc2(node) {
    let html = "";
    if (node.children && node.children.length > 0 && node.level < 3) {
        for (let i=0; i<node.children.length; i++) {
            const node1 = node.children[i];
            html += `<div class='item1' style='word-break: break-all; padding-left: ${node.level * 6 }px;'>`;
            html += `<a href='#${node1._node.id}'>${node1.text}</a>`;
            html += "</div>";
            html += makeToc2(node1);
        }
    }
    return html;
}

const mbc = document.querySelector('.markdown-body > .content');
const children = mbc.children;
const hChildren = [];
// h标签最大是6
const reg = /^H\d$/;
for (let child of children) {
    if (reg.test(child.tagName)) {
        hChildren.push({
            _node: child,
            num: +child.tagName.slice(1)
        });
    }
}
hChildren.reverse();
const tree = generateTree(hChildren);
if (tree.length) {
    const sc = makeToc(tree, "toc");
    const scb = document.querySelector('#header #sc-box');
    const scbStyl = getComputedStyle(scb);
    const right = scbStyl.right;
    const node = scb.querySelector('.wrapper');
    node.insertBefore(sc, node.firstChild);

    // scb是隐藏的
    if (right && right.startsWith('-')) {
        let title = sc.querySelector('.title');
        let content = sc.querySelector('.content');
        const contentStyl = getComputedStyle(content);
        const cHeight = contentStyl.height.slice(0, -2);
        sc.style.opacity = 1;
        content.style.height = "0px";
        content.style.opacity = 0;
        title.addEventListener('click', (ev) => {
            const target = ev.target;
            if (target.tagName.startsWith("H") || target.tagName === "SPAN") {
                if (content.style.height !== "0px") {
                    content.style.opacity = 0;
                    content.style.height = "0";
                    scb.style.right = right;
                }
                else {
                    content.style.opacity = 1;
                    content.style.height = cHeight + "px";
                    scb.style.right = "0px";
                }
            }
        }, true);
    }
}