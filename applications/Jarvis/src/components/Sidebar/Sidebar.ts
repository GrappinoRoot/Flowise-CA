import template from './Sidebar.html?raw'
import './Sidebar.css'
import { getState } from '../../store/store'
import { subscribe } from '../../store/subscribers'
import { getElement } from '../../utils/getElement'
import { dispatchStore } from '../../store/store'
import { Button } from '../../components/Button/Button'
import { ConversationItem } from '../../components/ConversationItem/ConversationItem'
import toggleIcon from '../../assets/toggle.svg'

export function mountSidebar(container: HTMLElement) {
    container.innerHTML = template

    let isCollapsed = false

    function toggleSidebar() {
        isCollapsed = !isCollapsed
        container.classList.toggle('collapsed', isCollapsed)
    }

    const conversationsContainer = getElement(container, '[data-conversations]')
    const toggleContainer = getElement<HTMLDivElement>(container, '[data-sidebar-toggle]')
    const headerContainer = getElement<HTMLDivElement>(container, '[data-sidebar-header]')

    function handleNewChat() {
        const conversationId = crypto.randomUUID()

        dispatchStore('CONVERSATION_CREATED', {
            Id: conversationId,
            title: 'New Chat'
        })
    }

    const newChatBtn = new Button({
        label: 'New Chat',
        variant: 'secondary',
        onClick: handleNewChat
    })

    const toggleBtn = new Button({
        label: '',
        icon: toggleIcon,
        variant: 'ghost',
        onClick: toggleSidebar
    })

    headerContainer.prepend(newChatBtn.render())
    toggleContainer.prepend(toggleBtn.render())

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

        conversationsContainer.replaceChildren()

        for (const conversation of state.conversations) {
            const item = new ConversationItem({
                id: conversation.Id,
                title: conversation.title,
                active: conversation.Id === state.activeConversationId
            })

            conversationsContainer.appendChild(item.render())
        }
    }
    render()

    subscribe(() => {
        render()
    })
}
