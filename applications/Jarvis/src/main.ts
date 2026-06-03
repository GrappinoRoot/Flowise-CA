import './styles/global.css'
import { mountChatView } from './views/ChatView/ChatView'
import { registerMiddleware } from './middleware/middleware'
import { chatMiddleware } from './middleware/chatMiddleware'

const appElement = document.querySelector<HTMLElement>('#app')

if (!appElement) {
    throw new Error('App element not found')
}

mountChatView(appElement)
registerMiddleware(chatMiddleware)
