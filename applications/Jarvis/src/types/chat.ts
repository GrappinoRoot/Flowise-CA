export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
    Id: string
    role: ChatRole
    content: string
    createdAt: number
}

export type Conversation = {
    Id: string
    title: string
    messages: ChatMessage[]
    createdAt: number
    updatedAt: number
    flowiseChatId?: string | null
}

export type AppState = {
    conversations: Conversation[]
    activeConversationId: string | null
    loading: boolean
}

export type NavbarProps = {
    isAuthenticated: boolean
    onNavigateAuth: () => void
    onLogout: () => Promise<void>
}

export type ButtonType = 'button' | 'submit' | 'reset'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'warning' | 'info' | 'light' | 'dark'

export type ButtonProps = {
    label: string
    onClick?: () => void
    type?: ButtonType
    variant?: ButtonVariant
    className?: string
}
