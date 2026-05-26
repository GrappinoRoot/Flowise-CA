type FlowisePredictionRequest = {
    question: string
}

type FlowisePredictionResponse = {
    text?: string
    question?: string
    answer?: string
    chatId?: string
    chatMessageId?: string
    sessionId?: string
    [key: string]: unknown
}

const FLOWISE_BASE_URL = import.meta.env.VITE_FLOWISE_BASE_URL
const FLOWISE_FLOW_ID = import.meta.env.VITE_FLOWISE_FLOW_ID

export async function sendMessageToFlowise(question: string): Promise<FlowisePredictionResponse> {
    if (!FLOWISE_BASE_URL || !FLOWISE_FLOW_ID) {
        throw new Error('Missing Flowise Enviroment variables')
    }
    if (!question.trim()) {
        throw new Error('Question cannot be empty')
    }

    const payload: FlowisePredictionRequest = {
        question
    }

    const response = await fetch(`${FLOWISE_BASE_URL}/api/v1/prediction/${FLOWISE_FLOW_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Flowise request failed: ${response.status} ${errorText}`)
    }

    const data = (await response.json()) as FlowisePredictionResponse

    return data
}
