// Elements
const board = document.querySelector('.board');
const inputResolution = document.querySelector('#resolution');
const inputColor = document.querySelector('#color');
const btnRainbow = document.querySelector('.btn.rainbow');
const btnEraser = document.querySelector('.btn.eraser');
const tools = document.querySelectorAll('.tool');

// 1 case:
// Case 1: Dragging start from the border between cells sometimes cause dragging the whole ghost image of section.board

// Variables
let mouseDown = false;
let selectedTool = 'pen';
let hue = 0;


// Functions
function updateGrid() {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${this.value}, 1fr)`;

    for (let i = 0; i < this.value * this.value; i++) {
        board.innerHTML += `<div class='grid-cell'></div>`;
    }
}

function displayValue() {
    const value = document.querySelector('.value');
    value.textContent = `${this.value} x ${this.value}`;
}

function fill(cell) {
    switch (selectedTool) {
        case 'pen':
            cell.style.background = inputColor.value;
            break;
        case 'rainbow':
            if (hue === 360) hue = 0;
            hue = hue + 2;
            cell.style.background = `hsl(${hue}, 100%, 50%)`;
            break;
        case 'eraser':
            cell.style.background = 'transparent';
            break;
    }
}

function updateSelectedTool(tool) {
    selectedTool = tool.dataset.tool;
    tools.forEach(tool => tool.classList.remove('selected'));
    tool.classList.add('selected');
}


tools.forEach(tool => tool.addEventListener('click', () => updateSelectedTool(tool)));

inputResolution.addEventListener('input', updateGrid);
inputResolution.addEventListener('input', displayValue);

board.addEventListener('mouseup', () => mouseDown = false)
board.addEventListener('mouseleave', e => mouseDown = false)
board.addEventListener('mousedown', e => {
    mouseDown = true;
    if (e.target !== e.currentTarget) fill(e.target);
})
board.addEventListener('mousemove', e => {
    if (mouseDown && e.target !== e.currentTarget) fill(e.target);
})


// Onload
inputResolution.value = 16;
for (let i = 0; i < inputResolution.value * inputResolution.value; i++) {
    board.innerHTML += `<div class='grid-cell'></div>`;
}