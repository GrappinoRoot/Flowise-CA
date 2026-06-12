import './Button.css'
import template from './Button.html?raw'
import type { ButtonProps } from '../../types/chat'
import { getElement } from '../../utils/getElement'
import { createIcon } from '../Icon/Icon'

export function createButton(props: ButtonProps): HTMLButtonElement {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = template

    const button = getElement<HTMLButtonElement>(wrapper, 'button')

    button.type = props.type ?? 'button'

    const labelElement = getElement<HTMLSpanElement>(button, '[data-label]')
    labelElement.textContent = props.label ?? ''

    if (props.icon) {
        const icon = createIcon({
            src: props.icon,
            alt: props.label
        })

        button.prepend(icon)
    }

    if (props.variant) {
        button.classList.add(`button--${props.variant}`)
    }

    if (props.onClick) {
        button.addEventListener('click', props.onClick)
    }

    return button
}
