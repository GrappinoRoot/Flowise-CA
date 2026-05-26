import './styles/global.css'
import { mountChatView } from './views/ChatView/ChatView'

const app = document.querySelector<HTMLElement>('#app')

if (!app) {
    throw new Error('App root element not found')
}

mountChatView(app)
