import template from './Message.html?raw'
import './Message.css'
import type { ChatRole } from '../../types/chat'
import { getElement } from '../../utils/getElement'

type MessageProps = {
    role: ChatRole
    content: string
}

export class Message {
    private element: HTMLElement

    constructor(private props: MessageProps) {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = template

        const root = getElement<HTMLElement>(wrapper, '[data-root]')

        root.classList.add(this.props.role)

        const contentEL = getElement<HTMLSpanElement>(wrapper, '[data-content]')
        contentEL.textContent = this.props.content

        this.element = root
    }
    render(): HTMLElement {
        return this.element
    }
}
