console.log("Start draw box.");

var drawBoard, ctx, target, inProgress, cp1x, cp1y, cp2x, cp2y, skip1, skip2, clearBtn, colorPicker, sizePicker;
var erasing = false;
var container;

function $(e) {
  return document.getElementById(e);
}

function draw(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  updatePosition(x, y);
  //ctx.globalCompositeOperation = 'source-over';
  ctx.shadowColor = colorPicker.value;
  ctx.shadowBlur = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = sizePicker.value;
  ctx.strokeStyle = colorPicker.value;

  if(erasing == true){
    ctx.globalCompositeOperation="destination-out";
  }else{
    ctx.globalCompositeOperation="source-over";
  }

  if (!inProgress) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    inProgress = true;
    skip1 = true;
    skip2 = false;
  } else {
    if (skip1) {
      cp1x = x;
      cp1y = y;
      skip1 = false;
      skip2 = true;
    }
    if (skip2) {
      cp2x = x;
      cp2y = y;
      skip1 = false;
      skip2 = false;
    } else {
      //ctx.lineTo(x,y);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      //ctx.quadraticCurveTo(cp1x, cp1y, x, y);
      skip1 = true;
      skip2 = false;
    }
  }
  ctx.stroke();
}

function point(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  updatePosition(x, y);
  ctx.fillStyle = colorPicker.value;
  ctx.beginPath();
  ctx.arc(
    x,
    y,
    sizePicker.value,
    degToRad(0),
    degToRad(360),
    false
  );
  ctx.fill();
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function updatePosition(x, y) {
  target.x.innerHTML = x;
  target.y.innerHTML = y;
}

function captureTouch() {
  drawBoard.addEventListener('selectstart', function (e) {
    e.preventDefault();
    return false;
  }, false);
  drawBoard.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  }, false);
  drawBoard.addEventListener('mousedown', function () {
    drawBoard.addEventListener('mousemove', draw, false);
  }, false);
  drawBoard.addEventListener('mouseup', function () {
    drawBoard.removeEventListener('mousemove', draw, false);
    inProgress = false;
    ctx.save();
  }, false);


}

function prepImg() {
  ctx = drawBoard.getContext('2d');
  const img = new Image();
  img.src = "./defaultImg.png";
  img.onload = () => {
    // console.log("w = " + img.width);
    // console.log("w = " + img.height);
    drawBoard.width = img.width;
    drawBoard.height = img.height;
    bkImageURL = "url(defaultImg.png)"
    drawBoard.style.backgroundImage = bkImageURL;
    // ctx.drawImage(img,0,0)
  }
}

function init() {

  penBtn = $("penBtn");
  eraserBtn = $("eraserBtn");
  clearBtn = $("clearBtn");

  container = $("container");
  drawBoard = $("drawBoard");
  drawBoard.width = 1000;
  drawBoard.height = 1000;
  // drawBoard.width = document.body.clientWidth;
  // drawBoard.height = window.innerHeight;

  prepImg();
  target = {
    x: $('posX'),
    y: $('posY')
  };
  captureTouch();
  document.body.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, false);

  penBtn.onclick = function () {
    erasing = false;
    $("eraserStat").innerHTML = "False";
  }

  eraserBtn.onclick = function () {
    erasing = true;
    $("eraserStat").innerHTML = "True";
  }

  clearBtn.onclick = function () {
    ctx.clearRect(0 ,0 ,drawBoard.width, drawBoard.height);
  };

  colorPicker = document.querySelector('input[type="color"');
  sizePicker = document.querySelector('input[type="range"');
  sizePicker.oninput = function () {
    $("output").textContent = sizePicker.value;
  };

}


init();