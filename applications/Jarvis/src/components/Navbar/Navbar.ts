import './Navbar.css'
import template from './Navbar.html?raw'
import type { NavbarProps } from '../../types/chat'

export function mountNavbar(container: HTMLElement, props: NavbarProps) {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = template

    const loginBtn = wrapper.querySelector('#loginBtn') as HTMLButtonElement
    const signupBtn = wrapper.querySelector('#signupBtn') as HTMLButtonElement
    const logoutBtn = wrapper.querySelector('#logoutBtn') as HTMLButtonElement

    // Gestione visibilità basata sull'autenticazione
    if (props.isAuthenticated) {
        loginBtn.style.display = 'none'
        signupBtn.style.display = 'none'
        logoutBtn.style.display = 'block'
    } else {
        loginBtn.style.display = 'block'
        signupBtn.style.display = 'block'
        logoutBtn.style.display = 'none'
    }

    // Event Listeners
    loginBtn.addEventListener('click', () => props.onNavigateAuth())
    signupBtn.addEventListener('click', () => props.onNavigateAuth())
    logoutBtn.addEventListener('click', () => {
        props.onLogout()
    })

    container.appendChild(wrapper)
}
