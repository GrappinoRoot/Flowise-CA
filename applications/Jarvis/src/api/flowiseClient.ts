const FLOWISE_BASE_URL = 'http://127.0.0.1:3000'

const FLOWISE_CHATFLOW_ID = '538c0a79-f803-4399-a89c-1a61ec8f2995'

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
