export function moveRow(cells, direction) {
    let moved = false;

    for (let row = 0; row < 4; row++) {
        const start = row * 4;
        const end = start + 4;
        const currentRow = cells.slice(start, end);
        const newRow = compressAndMerge(currentRow, direction);

        if (JSON.stringify(currentRow) !== JSON.stringify(newRow)) {
            cells.splice(start, 4, ...newRow);
            moved = true;
        }
    }

    return { cells, moved };
}

export function moveColumn(cells, direction) {
    let moved = false;

    for (let col = 0; col < 4; col++) {
        const column = [cells[col], cells[col + 4], cells[col + 8], cells[col + 12]];
        const newColumn = compressAndMerge(column, direction);

        if (JSON.stringify(column) !== JSON.stringify(newColumn)) {
            cells[col] = newColumn[0];
            cells[col + 4] = newColumn[1];
            cells[col + 8] = newColumn[2];
            cells[col + 12] = newColumn[3];
            moved = true;
        }
    }

    return { cells, moved };
}

export function compressAndMerge(array, direction) {
    const compressed = array.filter(cell => cell !== 0);
    if (direction === 'right' || direction === 'down') {
        compressed.reverse();
    }

    for (let i = 0; i < compressed.length - 1; i++) {
        if (compressed[i] === compressed[i + 1]) {
            compressed[i] *= 2;
            compressed.splice(i + 1, 1);
        }
    }

    while (compressed.length < 4) {
        compressed.push(0);
    }

    if (direction === 'right' || direction === 'down') {
        compressed.reverse();
    }

    return compressed;
}