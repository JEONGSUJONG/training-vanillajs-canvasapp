var isDrawing = false;
const ctx = document?.getElementById("canvas")?.getContext("2d");

function main() {
  prepareColors();
  setEventHandlersOnColorButtons();
  setEventHandlersOnBottomButtons();
  setEventHandlersOnCanvas();
}

function prepareColors() {
  const colorset = ["#000", "#666", "#d00", "#0a0", "#00c"];
  const colorButtons = document.querySelectorAll(".color");
  colorButtons.forEach((button, index) => {
    button.style.backgroundColor = colorset[index];
    if (index === 0) button.classList.add("selected");
  });
}

function setEventHandlersOnColorButtons() {
  const colorButtons = document.querySelectorAll(".color");
  colorButtons.forEach((button) => {
    button.addEventListener("click", onClickColorButton);
  });
}

function setEventHandlersOnBottomButtons() {
  const clearButton = document.getElementById("clearBtn");
  clearButton.addEventListener("click", onClickClearButton);
}

function setEventHandlersOnCanvas() {
  ctx.addEventListener("mousedown", onMouseDownInCanvas);
  ctx.addEventListener("mouseup", onMouseUpInCanvas);
  ctx.addEventListener("mousemove", onMouseMoveInCanvas);
}

function onClickColorButton() {
  const currentColor = this.style.backgroundColor;
  document
    .querySelectorAll(".color")
    .forEach((color) => color.classList.remove("selected"));
  this.classList.add("selected");
  ctx.strokeStyle = currentColor;
}

function onClickClearButton() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onMouseDownInCanvas(event) {
  isDrawing = true;
  const x = event.offsetX;
  const y = event.offsetY;
  ctx?.beginPath();
  ctx?.moveTo(x, y);
}

function onMouseUpInCanvas() {
  isDrawing = false;
  // ctx?.closePath()
  // ctx?.stroke()
}

function onMouseMoveInCanvas(event) {
  if (!isDrawing) return;
  if (!ctx) return;
  ctx.lineWidth = 5;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

document.addEventListener("DOMContentLoaded", main);
