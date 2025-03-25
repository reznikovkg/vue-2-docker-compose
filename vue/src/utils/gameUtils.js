export function moveRow(cells, direction, commit) {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        const start = row * 4;
        const end = start + 4;
        const currentRow = cells.slice(start, end);
        const compressed = compressAndMerge(currentRow, direction, commit);
        if (JSON.stringify(currentRow) !== JSON.stringify(compressed)) {
            cells.splice(start, 4, ...compressed);
            moved = true;
        }
    }
    return { cells, moved };
}

export function moveColumn(cells, direction, commit) {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        const column = [cells[col], cells[col + 4], cells[col + 8], cells[col + 12]];
        const compressed = compressAndMerge(column, direction, commit);
        if (JSON.stringify(column) !== JSON.stringify(compressed)) {
            cells[col] = compressed[0];
            cells[col + 4] = compressed[1];
            cells[col + 8] = compressed[2];
            cells[col + 12] = compressed[3];
            moved = true;
        }
    }
    return { cells, moved };
}
export function compressAndMerge(array, direction, commit) {
    const sanitizedArray = array.map(cell => (typeof cell === 'number' ? cell : 0));
    const compressed = sanitizedArray.filter(cell => cell !== 0);
    if (direction === 'right' || direction === 'down') {
        compressed.reverse();
    }
    for (let i = 0; i < compressed.length - 1; i++) {
        if (compressed[i] === compressed[i + 1]) {
            compressed[i] *= 2;
            const scoreIncrease = compressed[i];
            commit('ADD_SCORE', scoreIncrease);
            compressed.splice(i + 1, 1);
            i--;
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
