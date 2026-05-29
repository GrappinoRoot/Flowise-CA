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

    function render() {
        const state = getState()

        const activeConversation = state.conversations.find((conversation) => conversation.Id === state.activeConversationId)

        const messages = activeConversation?.messages ?? []

        messagesContainer.innerHTML = messages
            .map(
                (message) => `
                    <div>
                        ${message.content}
                    </div>
                `
            )
            .join('')
    }

    render()

    subscribe(() => {
        render()
    })
}
