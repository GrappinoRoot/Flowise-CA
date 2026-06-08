export function createLoading(): HTMLElement {
    const element = document.createElement('div')
    element.className = 'typing-indicator'
    element.textContent = 'Jarvis is typing...'

    return element
}
