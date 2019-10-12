(function (window, document) {
    var heartsSet = [];
    init();
    function animatedHeart() {
        for (var i = 0; i < heartsSet.length; i++) {
            if (heartsSet[i].opacity <= 0) {
                document.body.removeChild(heartsSet[i].el);
                heartsSet.splice(i, 1);
                continue;
            } else {
                heartsSet[i].top--;
                heartsSet[i].scale -= 0.015;
                heartsSet[i].opacity -= 0.018;
                heartsSet[i].el.style.cssText = `background: ${heartsSet[i].bgc};left: ${heartsSet[i].left}px;top: ${heartsSet[i].top}px;opacity:${heartsSet[i].opacity};transform:scale(${heartsSet[i].scale},${heartsSet[i].scale}) rotate(45deg)`;
            }
        }
        window.requestAnimationFrame ? window.requestAnimationFrame(animatedHeart) : setTimeout(function () {
            animatedHeart();
        }, 1000 / 60);
    }
    function bindEvent() {
        if (location.pathname == '/') {
            document.addEventListener('click', function (e) {
                var e = e || window.event;
                var left = e.clientX;
                var top = e.clientY;
                generateHeart(left, top);
            }, false);
        }
    }
    function init() {
        bindEvent();
        setStyle();
        animatedHeart();
    }
    function getRandomColor() {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        return `rgb(${red},${green},${blue})`;
    }
    function generateHeart(left, top) {
        var div = document.createElement('div');
        div.className = 'heart';
        document.body.appendChild(div);
        heartsSet.push({
            el: div,
            left: left - parseInt(div.offsetWidth / 2),
            top: top - parseInt(div.offsetHeight / 2),
            opacity: 1,
            bgc: getRandomColor(),
            scale: 1
        });
    }
    function setStyle() {
        var style = document.createElement('style');
        style.type = 'text/css';
        try {
            style.innerHTML = `.heart {
                            width: 20px;
                            height: 20px;
                            position: fixed;
                            transform: rotate(45deg);
                            background-color: pink;
                            z-index: 9999;
                        }
                        .heart::after, 
                        .heart::before {
                            content: '';
                            width: inherit;
                            height: inherit;
                            position: absolute;
                            border-radius: 50% 50% 50% 50%;
                            background-color: inherit;
                            z-index: 9999;
                        }
                        .heart:after {
                            top: -10px;
                        }
                        .heart:before {
                            left: -10px;
                        }  `;
            document.head.appendChild(style);
        } catch (e) {
            document.head.appendChild(style);
            style.sheet.insertRule(`.heart {
                            width: 20px;
                            height: 20px;
                            position: fixed;
                            top: 110px;
                            left: 20px;
                            transform: rotate(45deg);
                            background-color: pink;
                        }`, 0)
            style.sheet.insertRule(`.heart::after, 
                        .heart::before {
                            content: '';
                            width: inherit;
                            height: inherit;
                            position: absolute;
                            border-radius: 50% 50% 50% 50%;
                            background-color: pink;
                        }`, 1)
            style.sheet.insertRule(` .heart:after {
                            top: -10px;
                        }`, 2)
            style.sheet.insertRule(` .heart:before {
                            left: -10px;
                        } `, 3)
        }
    }
}(window, document))