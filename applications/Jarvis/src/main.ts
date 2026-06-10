import './styles/global.css'
import { registerMiddleware } from './middleware/middleware'
import { chatMiddleware } from './middleware/chatMiddleware'
import { initApp } from './services/initAppService'
import { initializeViewManager, showAuthView } from './services/viewManager'

const appElement = document.querySelector<HTMLElement>('#app')

if (!appElement) {
    throw new Error('App element not found')
}

initializeViewManager(appElement)

showAuthView()

registerMiddleware(chatMiddleware)

initApp()
