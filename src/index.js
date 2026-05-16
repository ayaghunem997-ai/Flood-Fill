const CellColor = {
  Pink: 1,
  Lavender: 2,
  Peach: 3,
  Mint: 4,
};

const initializeFloodFill = (img, sr, sc, newColor) => {
  const startColor = img[sr]?.[sc];

  if (startColor === undefined || startColor === newColor) {
    return null;
  }

  return {
    img,
    startColor,
    newColor,
  };
};

const getNeighbors = (row, col, img) => {
  const neighbors = [];

  if (row > 0) {
    neighbors.push([row - 1, col]);
  }

  if (row < img.length - 1) {
    neighbors.push([row + 1, col]);
  }

  if (col > 0) {
    neighbors.push([row, col - 1]);
  }

  const cols = img[row]?.length ?? 0;
  if (col < cols - 1) {
    neighbors.push([row, col + 1]);
  }

  return neighbors;
};

const floodFill = (img, sr, sc, newColor) => {
  const config = initializeFloodFill(img, sr, sc, newColor);

  if (!config) {
    return img;
  }

  const queue = [[sr, sc]];

  while (queue.length > 0) {
    const [r, c] = queue.shift();

    if (config.img[r]?.[c] === config.startColor) {
      config.img[r][c] = config.newColor;
      const neighbors = getNeighbors(r, c, config.img);
      queue.push(...neighbors);
    }
  }

  return config.img;
};

let currentImage = [
  [1, 1, 1, 2, 2],
  [1, 1, 0, 2, 2],
  [1, 0, 1, 1, 1],
  [2, 2, 1, 0, 1],
  [2, 2, 1, 1, 1],
];

let selectedColor = CellColor.Pink;

const grid = document.getElementById("grid");
const colorButtons = document.querySelectorAll(".color-btn");
const resetBtn = document.getElementById("resetBtn");

const renderGrid = (image) => {
  if (!grid) return;

  grid.innerHTML = "";

  image.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.dataset.row = rowIndex;
      div.dataset.col = colIndex;

      switch (cell) {
        case CellColor.Pink:
          div.classList.add("pink");
          break;
        case CellColor.Lavender:
          div.classList.add("lavender");
          break;
        case CellColor.Peach:
          div.classList.add("peach");
          break;
        case CellColor.Mint:
          div.classList.add("mint");
          break;
        default:
          div.classList.add("empty");
      }

      grid.appendChild(div);
    });
  });
};

colorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    colorButtons.forEach((item) => item.classList.remove("selected"));
    btn.classList.add("selected");
    selectedColor = parseInt(btn.dataset.color, 10);
  });
});

if (grid) {
  grid.addEventListener("click", (event) => {
    const cell = event.target.closest(".cell");
    if (!cell) return;

    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);

    currentImage = floodFill(currentImage, row, col, selectedColor);
    renderGrid(currentImage);
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    currentImage = [
      [1, 1, 1, 2, 2],
      [1, 1, 0, 2, 2],
      [1, 0, 1, 1, 1],
      [2, 2, 1, 0, 1],
      [2, 2, 1, 1, 1],
    ];
    renderGrid(currentImage);
  });
}

renderGrid(currentImage);
