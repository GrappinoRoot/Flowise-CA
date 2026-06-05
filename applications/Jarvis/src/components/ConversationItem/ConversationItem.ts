type ConversationItemProps = {
    id: string
    title: string
    active: boolean
}

export function createConversationItem(props: ConversationItemProps) {
    return `
    <div class="conversation ${props.active ? 'active' : ''}"
    data-id="${props.id}">
        <span>${props.title}</span>
    </div>
    `
}
