'use server'

import { aiChatBot } from '@/ai/flows/ai-chat-bot'

export async function submitMessage(message: string) {
  const { response } = await aiChatBot({ query: message })
  return response
}
