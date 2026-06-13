import template from './Icon.html?raw'
import './Icon.css'
import { getElement } from '../../utils/getElement'
import type { IconProps } from '../../types/chat'

export class Icon {
    private element: HTMLElement

    constructor(private props: IconProps) {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = template

        const iconEl = getElement<HTMLSpanElement>(wrapper, '[data-icon]')

        if (props.className) {
            iconEl.classList.add(...props.className.split(' '))
        }

        const img = document.createElement('img')
        img.src = this.props.src
        img.alt = this.props.alt ?? 'icon'

        iconEl.appendChild(img)
        this.element = iconEl
    }

    public render(): HTMLElement {
        return this.element
    }
}
