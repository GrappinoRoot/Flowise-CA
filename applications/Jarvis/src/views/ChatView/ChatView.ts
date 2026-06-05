import template from './ChatView.html?raw'
import './ChatView.css'
import { subscribe } from '../../store/subscribers'
import { getState } from '../../store/store'
import { mountComposer } from '../../components/Composer/Composer'
import { mountSidebar } from '../../components/Sidebar/Sidebar'
import { getElement } from '../../utils/getElement'

export function mountChatView(container: HTMLElement) {
    container.innerHTML = template

    // ----------------------------
    // DOM NODES
    // ----------------------------
    const messagesElement = getElement(container, '[data-messages]')
    const composerElement = getElement(container, '[data-composer]')
    const loadingElement = getElement(container, '[data-loading]')
    const sidebarElement = getElement(container, '[data-sidebar]')

    // ----------------------------
    // COMPOSER
    // ----------------------------
    mountComposer(composerElement)
    mountSidebar(sidebarElement)

    // ----------------------------
    // RENDER HELPERS
    // ----------------------------
    function renderLoading(state: ReturnType<typeof getState>) {
        loadingElement.innerHTML = state.loading ? '<div class="typing-indicator">Assistant is typing...</div>' : ''
    }

    function renderMessages(state: ReturnType<typeof getState>) {
        const activeConversation = state.activeConversationId
            ? state.conversations.find((c) => c.Id === state.activeConversationId)
            : undefined

        if (!activeConversation) {
            messagesElement.innerHTML = `
                <div class="empty-state">
                    Start a new conversation
                </div>
            `
            return
        }

        messagesElement.innerHTML = activeConversation.messages
            .map(
                (message) => `
                <div class="message ${message.role}">
                    ${message.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </div>
            `
            )
            .join('')
    }

    // ----------------------------
    // MAIN RENDER
    // ----------------------------
    function render() {
        const state = getState()

        renderLoading(state)
        renderMessages(state)
    }

    // ----------------------------
    // INIT
    // ----------------------------
    render()

    subscribe(() => {
        render()
    })
}
