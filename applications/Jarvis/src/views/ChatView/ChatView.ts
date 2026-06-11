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
import { mountNavbar } from '../../components/Navbar/Navbar'
import { showAuthView } from '../../services/viewManager'
import { signOut } from '../../services/authService'

export function mountChatView(container: HTMLElement) {
    container.innerHTML = template

    // ----------------------------
    // DOM NODES
    // ----------------------------
    const messagesElement = getElement(container, '[data-messages]')
    const composerElement = getElement(container, '[data-composer]')
    const loadingElement = getElement(container, '[data-loading]')
    const sidebarElement = getElement(container, '[data-sidebar]')
    const navbarElement = getElement(container, '[data-navbar]')

    // ----------------------------
    // COMPONENTS
    // ----------------------------
    mountComposer(composerElement)
    mountSidebar(sidebarElement)

    mountNavbar(navbarElement, {
        isAuthenticated: true,
        onNavigateAuth: () => showAuthView(),
        onLogout: async () => {
            await signOut()
            showAuthView()
        }
    })

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

    // NOTA: In un'app reale, subscribe dovrebbe ritornare una funzione di unsubscribe
    // da chiamare quando la vista viene smontata per evitare memory leak.
    subscribe(() => {
        render()
    })
}
