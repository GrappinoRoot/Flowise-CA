import optionConversationIcon from '../../assets/optionConversation.svg'
import './ConversationItem.css'
import { dispatchStore } from '../../store/store'

let isOpen = false

type ConversationItemProps = {
    id: string
    title: string
    active: boolean
}

export function createConversationItem(props: ConversationItemProps): HTMLElement {
    const wrapper = document.createElement('div')

    wrapper.className = `conversation ${props.active ? 'active' : ''}`
    wrapper.dataset.id = props.id

    const title = document.createElement('span')
    title.textContent = props.title

    const actions = document.createElement('button')
    actions.className = 'conversation-actions'
    actions.type = 'button'

    actions.addEventListener('click', (e) => {
        e.stopPropagation()

        isOpen = !isOpen
        menu.style.display = isOpen ? 'block' : 'none'
    })

    const menu = document.createElement('div')
    menu.className = 'conversation-menu'
    menu.style.display = 'none'

    const rename = document.createElement('div')
    rename.className = 'conversation-menu-item'
    rename.textContent = 'Rename'

    rename.addEventListener('click', (e) => {
        e.stopPropagation()

        const title = window.prompt('Conversation name', props.title)

        if (!title?.trim()) {
            return
        }

        dispatchStore('CONVERSATION_RENAMED', {
            conversationId: props.id,
            title: title.trim()
        })
    })

    const remove = document.createElement('div')
    remove.className = 'conversation-menu-item'
    remove.textContent = 'Remove'

    remove.addEventListener('click', (e) => {
        e.stopPropagation()

        dispatchStore('CONVERSATION_DELETED', {
            conversationId: props.id
        })
    })

    const icon = document.createElement('img')
    icon.src = optionConversationIcon
    icon.alt = 'actions'
    icon.className = 'conversation-icon'

    menu.appendChild(rename)
    menu.appendChild(remove)
    wrapper.appendChild(title)
    wrapper.appendChild(actions)
    wrapper.appendChild(menu)
    actions.appendChild(icon)
    return wrapper
}
