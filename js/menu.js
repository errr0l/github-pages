let menu = document.querySelector('.eb-menu');
let showed = false;

if (menu) {
    let mask = document.querySelector("#mask-1");
    if (!mask) {
        mask = document.createElement('div');
        mask.className = "mask";
        mask.id = "mask-1";
        document.body.appendChild(mask);
    }

    let nav = document.querySelector('.nav');
    menu.addEventListener("click", function() {
        let _showed = !showed;
        if (_showed) {
            nav.style.display = "block";
            mask.style.display = "block";
        }
        else {
            nav.style.display = "none";
            mask.style.display = "none";
        }

        showed = _showed;
    });

    nav.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    mask.addEventListener('click', function () {
        nav.style.display = "none";
        mask.style.display = "none";
        showed = false;
    });
} 