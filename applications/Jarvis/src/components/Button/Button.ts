import './Button.css'

type ButtonType = 'button' | 'submit' | 'reset'

type ButtonProps = {
    label: string
    onClick?: () => void
    type?: ButtonType
    className?: string
    icon?: string
}

export function createButton(props: ButtonProps): HTMLButtonElement {
    const button = document.createElement('button')

    button.type = props.type ?? 'button'
    button.className = props.className ?? ''

    if (props.icon) {
        const img = document.createElement('img')
        img.src = props.icon
        img.alt = 'icon'
        img.className = 'button-icon'
        button.appendChild(img)
    }

    if (props.label) {
        const span = document.createElement('span')
        span.textContent = props.label
        button.appendChild(span)
    }

    if (props.onClick) {
        button.addEventListener('click', props.onClick)
    }

    return button
}
