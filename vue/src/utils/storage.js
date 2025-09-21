const STORAGE_KEY = 'find-differences-levels'

export function getLevels() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

export function saveLevel(level) {
    const levels = getLevels()
    const existingIndex = levels.findIndex(l => l.id === level.id)

    if (existingIndex >= 0) {
        levels[existingIndex] = level
    } else {
        levels.push(level)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(levels))
}

export function getLevel(id) {
    return getLevels().find(l => l.id === id)
}

export function deleteLevel(id) {
    const levels = getLevels().filter(l => l.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(levels))
}