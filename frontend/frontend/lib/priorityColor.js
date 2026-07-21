// Priority scale: 0 (grey) -> 10 (red)
const GREY = { r: 154, g: 140, b: 152 } // #9a8c98
const RED = { r: 189, g: 63, b: 62 }    // #bd3f3e

export function getPriorityRgb(level) {
    const clamped = Math.min(Math.max(Number(level) || 0, 0), 10)
    const ratio = clamped / 10

    const r = Math.round(GREY.r + (RED.r - GREY.r) * ratio)
    const g = Math.round(GREY.g + (RED.g - GREY.g) * ratio)
    const b = Math.round(GREY.b + (RED.b - GREY.b) * ratio)

    return { r, g, b }
}

export function getPriorityColor(level) {
    const { r, g, b } = getPriorityRgb(level)
    return `rgb(${r}, ${g}, ${b})`
}

export function getPriorityStyles(level) {
    const { r, g, b } = getPriorityRgb(level)
    return {
        color: `rgb(${r}, ${g}, ${b})`,
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        borderColor: `rgba(${r}, ${g}, ${b}, 0.2)`,
    }
}