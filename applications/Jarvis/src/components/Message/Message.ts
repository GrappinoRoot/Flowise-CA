import type { ChatRole } from '../../types/chat'

type MessageProps = {
    role: ChatRole
    content: string
}

export function createMessage(props: MessageProps): HTMLElement {
    const wrapper = document.createElement('div')

    wrapper.className = `message ${props.role}`
    const text = document.createElement('span')
    text.textContent = props.content

    wrapper.appendChild(text)

    return wrapper
}
