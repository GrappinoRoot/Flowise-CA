import template from './Sidebar.html?raw'
import './Sidebar.css'
import { getState } from '../../store/store'
import { subscribe } from '../../store/subscribers'
import { getElement } from '../../utils/getElement'
import { dispatchStore } from '../../store/store'
import { createButton } from '../../components/Button/Button'

export function mountSidebar(container: HTMLElement) {
    container.innerHTML = template

    const conversationsContainer = getElement(container, '[data-conversations]')
    const headerContainer = getElement<HTMLDivElement>(container, '[data-sidebar-header]')

    function handleNewChat() {
        const Id = crypto.randomUUID()

        dispatchStore('CONVERSATION_CREATED', {
            Id,
            title: 'New Chat'
        })
    }

    const newChatBtn = createButton({
        label: 'New Chat',
        className: 'button',
        onClick: handleNewChat
    })

    // Attach listeners once (Event Delegation)
    conversationsContainer.addEventListener('click', (event) => {
        const target = event.target as HTMLElement
        const conversationEl = target.closest('[data-id]') as HTMLElement | null

        if (!conversationEl) return

        const conversationId = conversationEl.dataset.id
        if (!conversationId) return

        dispatchStore('CONVERSATION_SELECTED', {
            conversationId
        })
    })

    function render() {
        const state = getState()

        conversationsContainer.innerHTML = state.conversations
            .map(
                (c) => `
                <div class="conversation ${c.Id === state.activeConversationId ? 'active' : ''}" data-id="${c.Id}">
                    ${c.title.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </div>
            `
            )
            .join('')
    }

    render()

    subscribe(() => {
        render()
    })

    headerContainer.appendChild(newChatBtn)
}
