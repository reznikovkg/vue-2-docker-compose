export function validateFlower(mapMatrix) {
    const flowerValue = 4;
    let status = "Всё ок";
  
    let flowerFound = false;
    let flowerPositions = [];
  
    for (let row = 0; row < mapMatrix.length; row++) {
      for (let col = 0; col < mapMatrix[row].length; col++) {
        if (mapMatrix[row][col] === flowerValue) {
          flowerFound = true;
          flowerPositions.push([row, col]);
          break;
        }
      }
      if (flowerFound) break;
    }
  
    if (!flowerFound) {
      return "На карте нет цветка.";
    }
  
    const matrixCopy = mapMatrix.map((row) => row.slice());
    const [startRow, startCol] = flowerPositions[0];
  
    const visitedValue = -1;
    const bfs = (row, col) => {
      const queue = [[row, col]];
      matrixCopy[row][col] = visitedValue;
  
      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
  
      while (queue.length > 0) {
        const [curRow, curCol] = queue.shift();
  
        for (let [dRow, dCol] of directions) {
          const newRow = curRow + dRow;
          const newCol = curCol + dCol;
  
          if (
            newRow >= 0 &&
            newRow < matrixCopy.length &&
            newCol >= 0 &&
            newCol < matrixCopy[0].length &&
            matrixCopy[newRow][newCol] === flowerValue
          ) {
            matrixCopy[newRow][newCol] = visitedValue;
            queue.push([newRow, newCol]);
          }
        }
      }
    };
  
    bfs(startRow, startCol);
  
    for (let row = 0; row < matrixCopy.length; row++) {
      for (let col = 0; col < matrixCopy[row].length; col++) {
        if (matrixCopy[row][col] === flowerValue) {
          return "Цветок должен быть единым целым";
        }
      }
    }
  
    return status;
  }
  
  export function validateWall(mapMatrix) {
    const airValue = 1;
    const visitedValue = -1;
    const wallValue = 3
    let status = "Всё ок";
  
    const rows = mapMatrix.length;
    const cols = mapMatrix[0].length;
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1) {
          if (mapMatrix[row][col] !== airValue && mapMatrix[row][col] !== wallValue) {
            return "Краями карты может быть только воздух или стена";
          }
        }
      }
    }
  
    const matrixCopy = mapMatrix.map((row) => row.slice());
  
    const bfs = (startRow, startCol) => {
      const queue = [[startRow, startCol]];
      matrixCopy[startRow][startCol] = visitedValue;
  
      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
  
      while (queue.length > 0) {
        const [curRow, curCol] = queue.shift();
  
        for (let [dRow, dCol] of directions) {
          const newRow = curRow + dRow;
          const newCol = curCol + dCol;
  
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            const currentValue = matrixCopy[newRow][newCol]
            if (currentValue === airValue) {
              matrixCopy[newRow][newCol] = visitedValue;
              queue.push([newRow, newCol]);
            } else if (currentValue !== wallValue && currentValue !== visitedValue) {
              return "Стены должны закрывать все проходы к воздуху";
            }
          }
        }
      }
      return null;
    };
  
    let foundAir = true;
    while (foundAir) {
      foundAir = false;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (matrixCopy[row][col] === airValue) {
            const result = bfs(row, col);
            if (result) return result;
            foundAir = true;
            break;
          }
        }
        if (foundAir) break;
      }
    }
  
    return status;
  }
  
  export function validateGround(mapMatrix) {
    const groundValue = 5;
    const containsGround = mapMatrix.flat().includes(groundValue);
    return containsGround ? "Всё ок" : "Клетки земли нет на карте";
  }
  