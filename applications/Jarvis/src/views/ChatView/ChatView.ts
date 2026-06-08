import template from './ChatView.html?raw'
import './ChatView.css'
import { subscribe } from '../../store/subscribers'
import { getState } from '../../store/store'
import { mountComposer } from '../../components/Composer/Composer'
import { mountSidebar } from '../../components/Sidebar/Sidebar'
import { getElement } from '../../utils/getElement'
import { createMessage } from '../../components/Message/Message'
import { createLoading } from '../../components/Loading/Loading'
import { createEmptyState } from '../../components/EmptyState/EmptyState'

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
        loadingElement.replaceChildren()

        if (!state.loading) return
        loadingElement.appendChild(createLoading())
    }

    function renderMessages(state: ReturnType<typeof getState>) {
        const activeConversation = state.activeConversationId
            ? state.conversations.find((c) => c.Id === state.activeConversationId)
            : undefined

        messagesElement.replaceChildren()

        if (!activeConversation) {
            messagesElement.appendChild(createEmptyState())
            return
        }

        for (const message of activeConversation.messages) {
            messagesElement.appendChild(
                createMessage({
                    role: message.role,
                    content: message.content
                })
            )
        }
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
