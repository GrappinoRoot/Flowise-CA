import optionConversationIcon from '../../assets/optionConversation.svg'
import './ConversationItem.css'
import { dispatchStore } from '../../store/store'

type ConversationItemProps = {
    id: string
    title: string
    active: boolean
}

function createUI(props: ConversationItemProps) {
    const wrapper = document.createElement('div')
    wrapper.className = `conversation ${props.active ? 'active' : ''}`
    wrapper.dataset.id = props.id

    const title = document.createElement('span')
    title.textContent = props.title

    const actions = document.createElement('button')
    actions.className = 'conversation-actions'
    actions.type = 'button'

    const icon = document.createElement('img')
    icon.src = optionConversationIcon
    icon.alt = 'actions'
    icon.className = 'conversation-icon'

    actions.appendChild(icon)

    const menu = document.createElement('div')
    menu.className = 'conversation-menu'
    menu.style.display = 'none'

    wrapper.append(title, actions, menu)

    return { wrapper, title, actions, menu }
}

function bindMenuToggle(actions: HTMLElement, menu: HTMLElement) {
    actions.addEventListener('click', (e) => {
        e.stopPropagation()

        const open = menu.style.display === 'block'
        menu.style.display = open ? 'none' : 'block'
    })
}

function bindMenuActions(props: ConversationItemProps, menu: HTMLElement, wrapper: HTMLElement, titleEl: HTMLSpanElement) {
    const rename = document.createElement('div')
    rename.className = 'conversation-menu-item'
    rename.textContent = 'Rename'

    rename.addEventListener('click', (e) => {
        e.stopPropagation()

        const input = document.createElement('input')
        input.value = props.title

        wrapper.replaceChild(input, titleEl)
        menu.style.display = 'none'

        const save = () => {
            const value = input.value.trim()

            if (!value) {
                wrapper.replaceChild(titleEl, input)
                return
            }

            dispatchStore('CONVERSATION_RENAMED', {
                conversationId: props.id,
                title: value
            })
        }

        input.addEventListener('blur', save)
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') save()
        })

        input.focus()
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

    menu.append(rename, remove)
}

export function createConversationItem(props: ConversationItemProps): HTMLElement {
    const { wrapper, title, actions, menu } = createUI(props)

    bindMenuToggle(actions, menu)
    bindMenuActions(props, menu, wrapper, title)

    return wrapper
}
