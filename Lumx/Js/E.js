// 页面加载初始化
function initPage() {
    initComparisons();  // 初始化比较功能
    showImage('displayImage');  // 显示默认图片
}

// 初始化比较功能
function initComparisons() {
  const overlays = document.getElementsByClassName("img-comp-overlay");
  for (let i = 0; i < overlays.length; i++) {
    compareImages(overlays[i]);
  }
}

function compareImages(img) {
  let slider, clicked = 0, w = img.offsetWidth, h = img.offsetHeight;
  
  img.style.width = (w / 2) + "px";
  
  slider = document.createElement("DIV");
  slider.setAttribute("class", "img-comp-slider");
  img.parentElement.insertBefore(slider, img);

  slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
  slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

  slider.addEventListener("mousedown", slideReady);
  window.addEventListener("mouseup", slideFinish);
  slider.addEventListener("touchstart", slideReady);
  window.addEventListener("touchend", slideFinish);

  function slideReady(e) {
    e.preventDefault();
    clicked = 1;
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
  }

  function slideFinish() {
    clicked = 0;
  }

  function slideMove(e) {
    if (clicked === 0) return;
    let pos = getCursorPos(e);
    if (pos < 0) pos = 0;
    if (pos > w) pos = w;
    slide(pos);
  }

  function getCursorPos(e) {
    const rect = img.getBoundingClientRect();
    let x = (e.changedTouches ? e.changedTouches[0] : e).pageX - rect.left;
    return x - window.pageXOffset;
  }

  function slide(x) {
    img.style.width = x + "px";
    slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
  }
}

// 变量用来追踪当前状态
let isOriginalState = true;

function toggleImage() {
    const displayImage = document.getElementById('displayImage');
    const toggleButton = document.getElementById('toggleButton');

    if (isOriginalState) {
        // 切换到第二张图片和按钮
        displayImage.src = '../Picture/Photo mine/db/E/5.jpg'; // 亮的图片路径
        toggleButton.src = '../Picture/Photo mine/db/E/open.png'; // 按钮切换到亮的图片路径
    } else {
        // 切换回初始图片和按钮
        displayImage.src = '../Picture/Photo mine/db/E/5o.jpg'; // 暗的图片路径
        toggleButton.src = '../Picture/Photo mine/db/E/close.png'; // 按钮切换回暗的图片路径
    }

    // 切换状态
    isOriginalState = !isOriginalState;
}
