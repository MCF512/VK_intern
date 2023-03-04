const generateCells = () => {
  // создаем клетки
  const cells = [];
  for (let row = 0; row < 16; row++) {
    cells.push([]);
    for (let col = 0; col < 16; col++) {
      cells[row].push({ bomb: false, state: 0 }); // 0 = не нажата, 1 = видимая, 2 = флаг
    }
  }

  // Распределяем бомбы
  for (let i = 0; i < 40; i++) {
    let placedBomb = false;
    while (!placedBomb) {
      let row = Math.floor(Math.random() * 16);
      let col = Math.floor(Math.random() * 16);

      if (!cells[row][col].bomb) {
        cells[row][col].bomb = true;
        placedBomb = true;
      }
    }
  }

  // Считаем значение каждой клетки
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 16; col++) {
      const cell = cells[row][col];
      if (cell.bomb) {
        cell.value = -1;
        continue;
      }

      let counter = 0;
      if (row > 0 && col > 0 && cells[row - 1][col - 1].bomb) {
        counter++;
      }
      if (row > 0 && cells[row - 1][col].bomb) {
        counter++;
      }
      if (row > 0 && col < 15 && cells[row - 1][col + 1].bomb) {
        counter++;
      }
      if (col > 0 && cells[row][col - 1].bomb) {
        counter++;
      }
      if (col < 15 && cells[row][col + 1].bomb) {
        counter++;
      }
      if (row < 15 && col > 0 && cells[row + 1][col - 1].bomb) {
        counter++;
      }
      if (row < 15 && cells[row + 1][col].bomb) {
        counter++;
      }
      if (row < 15 && col < 15 && cells[row + 1][col + 1].bomb) {
        counter++;
      }

      cell.value = counter;
    }
  }

  return cells;
};

export default generateCells;