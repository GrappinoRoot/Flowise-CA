import template from './Icon.html?raw'
import './Icon.css'
import { getElement } from '../../utils/getElement'
import type { IconProps } from '../../types/chat'

export function createIcon(props: IconProps): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = template

    const iconEl = getElement<HTMLSpanElement>(wrapper, '[data-icon]')

    if (props.className) {
        iconEl.classList.add(...props.className.split(' '))
    }

    const img = document.createElement('img')
    img.src = props.src
    img.alt = props.alt ?? 'icon'

    iconEl.appendChild(img)

    return iconEl
}
