import.meta.env

const FLOWISE_BASE_URL = import.meta.env.VITE_FLOWISE_BASE_URL
const FLOWISE_CHATFLOW_ID = import.meta.env.VITE_FLOWISE_CHATFLOW_ID

export type FlowisePredictionResponse = {
    text: string
    chatId: string
    chatMessageId: string
}

export async function sendToFlowise(question: string, chatId?: string): Promise<FlowisePredictionResponse> {
    const response = await fetch(`${FLOWISE_BASE_URL}/api/v1/prediction/${FLOWISE_CHATFLOW_ID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question,
            chatId,
            streaming: false,
            overrideConfig: {}
        })
    })

    if (!response.ok) {
        const errorText = await response.text()

        throw new Error(`Flowise request failed: ${response.status} ${errorText}`)
    }

    return await response.json()
}
