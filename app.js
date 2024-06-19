const modeBtn = document.getElementById("mode-btn");
const delBtn = document.getElementById("del-btn");
const undoBtn = document.getElementById("undo-btn");

const lineWidth = document.getElementById("line-width");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;
let memory_arr = [];
let memory_idx = -1;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

// 이미지 그리기
function onMouseDown() {
  isPainting = true;
}

function onMouseUp() {
  if (isPainting) {
    memory_arr.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
    memory_idx = memory_arr.length - 1;
    console.log("Push memory_arr", memory_arr);
    console.log("Push memory_idx", memory_idx);
  }
  isPainting = false;
  ctx.beginPath();
}

// 뒤로가기
function undo_latest() {
  if (memory_idx >= 0) {
    memory_arr.pop();
    memory_idx = memory_arr.length - 1;
    console.log("Pop memory_arr", memory_arr);
    console.log("Pop memory_idx", memory_idx);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (memory_idx >= 0) {
      ctx.putImageData(memory_arr[memory_idx], 0, 0);
    }
  }
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorClick(event) {
  colorOptions.forEach((option) => option.classList.remove("selected"));
  event.target.classList.add("selected");
  const colorValue = event.target.getAttribute("data-color");
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "채우기";
  } else {
    isFilling = true;
    modeBtn.innerText = "그리기";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    memory_arr.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
    memory_idx = memory_arr.length - 1;
  }
}

function onDelBtn() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  memory_arr = [];
  memory_idx = -1;
  console.log("All Clear.");
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
delBtn.addEventListener("click", onDelBtn);
undoBtn.addEventListener("click", undo_latest);
