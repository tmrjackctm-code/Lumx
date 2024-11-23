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

function toggleImage() {
    const image = document.getElementById("displayImage");
    const toggleSwitch = document.getElementById("toggleSwitch");

    if (toggleSwitch.checked) {
        image.src = "../Picture/Photo mine/db/R/3.jpg"; // Path to the second image
        image.alt = "Image 2";
    } else {
        image.src = "../Picture/Photo mine/db/R/3b.jpg"; // Path to the first image
        image.alt = "Image 1";
    }
}
