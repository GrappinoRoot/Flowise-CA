import './styles/global.css'
import { mountChatView } from './views/ChatView/ChatView'

const appElement = document.querySelector<HTMLElement>('#app')

if (!appElement) {
    throw new Error('App element not found')
}

mountChatView(appElement)
