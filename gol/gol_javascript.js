const ROWS = 30;
const COLS = 50;
let grid = [];
let interval = null;

const gridElement = document.getElementById("grid");

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => 0)
  );
}

function renderGrid() {
  gridElement.innerHTML = "";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;

      if (grid[r][c] === 1) cell.classList.add("alive");

      cell.addEventListener("click", () => {
        grid[r][c] = grid[r][c] ? 0 : 1;
        cell.classList.toggle("alive");
      });

      gridElement.appendChild(cell);
    }
  }
}

function countNeighbors(r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        count += grid[nr][nc];
      }
    }
  }
  return count;
}

function nextGeneration() {
  const newGrid = createEmptyGrid();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const alive = grid[r][c] === 1;
      const neighbors = countNeighbors(r, c);
      if (alive && (neighbors === 2 || neighbors === 3)) {
        newGrid[r][c] = 1;
      } else if (!alive && neighbors === 3) {
        newGrid[r][c] = 1;
      }
    }
  }
  grid = newGrid;
  updateDOM();
}

function updateDOM() {
  document.querySelectorAll(".cell").forEach(cell => {
    const r = cell.dataset.row;
    const c = cell.dataset.col;
    if (grid[r][c] === 1) cell.classList.add("alive");
    else cell.classList.remove("alive");
  });
}

document.getElementById("start").onclick = () => {
  if (!interval) {
    const speed = document.getElementById("speed").value;
    interval = setInterval(nextGeneration, speed);
  }
};

document.getElementById("stop").onclick = () => {
  clearInterval(interval);
  interval = null;
};

document.getElementById("step").onclick = nextGeneration;

document.getElementById("clear").onclick = () => {
  clearInterval(interval);
  interval = null;
  grid = createEmptyGrid();
  updateDOM();
};

document.getElementById("random").onclick = () => {
  grid = grid.map(row => row.map(() => (Math.random() < 0.25 ? 1 : 0)));
  updateDOM();
};

document.getElementById("speed").oninput = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
    document.getElementById("start").click();
  }
};

grid = createEmptyGrid();
renderGrid();

const bg = document.getElementById("background");
const cubeCount = 150; // kolik kostiček

const stars = document.getElementById("stars");
const starCount = 200;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  star.className = "star";

  const size = Math.random() * 2 + 1; // 1–3 px
  star.style.width = size + "px";
  star.style.height = size + "px";

  star.style.left = Math.random() * 100 + "vw";
  star.style.top = Math.random() * 100 + "vh";

  star.style.opacity = Math.random() * 0.8 + 0.2;

  stars.appendChild(star);
}
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.body.className = "theme-" + btn.dataset.theme;
    });
  });
    