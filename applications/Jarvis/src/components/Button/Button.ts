import './Button.css'
import template from './Button.html?raw'
import type { ButtonProps } from '../../types/chat'
import { getElement } from '../../utils/getElement'
import { Icon } from '../Icon/Icon'

export class Button {
    private element: HTMLButtonElement

    constructor(private props: ButtonProps) {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = template

        const button = getElement<HTMLButtonElement>(wrapper, 'button')
        button.type = this.props.type ?? 'button'

        const labelElement = getElement<HTMLSpanElement>(button, '[data-label]')
        labelElement.textContent = this.props.label ?? ''

        if (this.props.icon) {
            const icon = new Icon({
                src: this.props.icon,
                alt: this.props.label,
                className: 'button-icon'
            })

            button.prepend(icon.render())
        }

        if (props.variant) {
            button.classList.add(`button--${props.variant}`)
        }

        if (props.onClick) {
            button.addEventListener('click', props.onClick)
        }
        this.element = button
    }

    render(): HTMLButtonElement {
        return this.element
    }
}
