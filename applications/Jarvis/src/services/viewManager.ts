import { mountAuthView } from '../views/AuthView/AuthView'
import { mountChatView } from '../views/ChatView/ChatView'

let rootElement: HTMLElement | null = null

export function initializeViewManager(container: HTMLElement) {
    rootElement = container
}

export function showAuthView() {
    if (!rootElement) return

    rootElement.innerHTML = ''
    mountAuthView(rootElement)
}

export function showChatView() {
    if (!rootElement) return

    rootElement.innerHTML = ''
    mountChatView(rootElement)
}
