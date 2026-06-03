import template from './ChatView.html?raw'
import './ChatView.css'
import { subscribe } from '../../store/subscribers'
import { getState } from '../../store/store'
import { mountComposer } from '../../components/Composer/Composer'

export function mountChatView(container: HTMLElement) {
    container.innerHTML = template

    const messagesElement = container.querySelector<HTMLElement>('[data-messages]')

    if (!messagesElement) {
        throw new Error('Messages container not found')
    }

    const messagesContainer = messagesElement

    const composerElement = container.querySelector<HTMLElement>('[data-composer]')

    if (!composerElement) {
        throw new Error('Composer container not found')
    }

    const composerContainer = composerElement

    mountComposer(composerContainer)

    const loadingElement = container.querySelector<HTMLElement>('[data-loading]')
    if (!loadingElement) {
        throw new Error('Loading element not found')
    }
    const loadingContainer = loadingElement

    function render() {
        const state = getState()
        loadingContainer.innerHTML = state.loading ? '<div class="typing-indicator">Assistant is typing...</div>' : ''

        const activeConversation = state.activeConversationId
            ? state.conversations.find((c) => c.Id === state.activeConversationId)
            : undefined

        const messages = activeConversation?.messages ?? []
        if (!activeConversation) {
            messagesContainer.innerHTML = `
            <div class="empty-state>
            Start a new conversation
            </div>
            `
        }

        messagesContainer.innerHTML = messages
            .map((message) => {
                return `
                    <div class="message ${message.role}">
                        ${message.content}
                    </div>
                `
            })
            .join('')
    }
    render()

    subscribe(() => {
        render()
    })
}
