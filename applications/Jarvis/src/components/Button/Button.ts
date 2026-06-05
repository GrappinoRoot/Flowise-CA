import './Button.css'

type ButtonType = 'button' | 'submit' | 'reset'

type ButtonProps = {
    label: string
    onClick?: () => void
    type?: ButtonType
    className?: string
}

export function createButton(props: ButtonProps) {
    const button = document.createElement('button')

    button.type = props.type ?? 'button'
    button.textContent = props.label

    if (props.className) {
        button.classList.add(props.className)
    }

    if (props.onClick) {
        button.addEventListener('click', props.onClick)
    }

    return button
}
