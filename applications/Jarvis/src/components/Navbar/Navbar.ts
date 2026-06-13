import './Navbar.css'
import template from './Navbar.html?raw'
import type { NavbarProps } from '../../types/chat'
import { Button } from '../Button/Button' // Importa il componente Button
import { getElement } from '../../utils/getElement' // Assicurati che getElement sia importato se usato nel template

export function mountNavbar(container: HTMLElement, props: NavbarProps) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = template

    const actionsContainer = getElement(wrapper, '[data-actions]')
    actionsContainer.replaceChildren() // Pulisce i pulsanti esistenti dal template HTML

    // Crea i pulsanti usando il componente riutilizzabile
    const loginBtn = new Button({
        label: 'Login',
        variant: 'ghost',
        onClick: () => props.onNavigateAuth()
    }).render()
    const signupBtn = new Button({
        label: 'Sign up',
        variant: 'primary',
        onClick: () => props.onNavigateAuth()
    }).render()
    const logoutBtn = new Button({
        label: 'Logout',
        variant: 'logout',
        onClick: () => props.onLogout()
    }).render()

    // Gestione visibilità basata sull'autenticazione
    if (props.isAuthenticated) {
        actionsContainer.appendChild(logoutBtn)
    } else {
        actionsContainer.appendChild(loginBtn)
        actionsContainer.appendChild(signupBtn)
    }

    container.appendChild(wrapper)
}
