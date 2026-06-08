import template from './Sidebar.html?raw'
import './Sidebar.css'
import { getState } from '../../store/store'
import { subscribe } from '../../store/subscribers'
import { getElement } from '../../utils/getElement'
import { dispatchStore } from '../../store/store'
import { createButton } from '../../components/Button/Button'
import { createConversationItem } from '../../components/ConversationItem/ConversationItem'
import toggleIcon from '../../assets/toggle.svg'

export function mountSidebar(container: HTMLElement) {
    container.innerHTML = template

    let isCollapsed = false

    function toggleSidebar() {
        isCollapsed = !isCollapsed
        container.classList.toggle('collapsed', isCollapsed)
    }

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

    const toggleBtn = createButton({
        label: '',
        icon: toggleIcon,
        className: 'sidebar-toggle',
        onClick: toggleSidebar
    })

    headerContainer.appendChild(newChatBtn)
    headerContainer.appendChild(toggleBtn)

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
            .map((c) =>
                createConversationItem({
                    id: c.Id,
                    title: c.title.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
                    active: c.Id === state.activeConversationId
                })
            )
            .join('')
    }

    render()

    subscribe(() => {
        render()
    })

    headerContainer.appendChild(newChatBtn)
    headerContainer.appendChild(toggleBtn)
}
