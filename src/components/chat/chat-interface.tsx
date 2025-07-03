'use client'

import { useState, useRef, useEffect } from 'react'
import { submitMessage } from '@/app/actions'
import { ChatMessages } from '@/components/chat/chat-messages'
import { ChatInput } from '@/components/chat/chat-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '../ui/skeleton'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Bot } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "¡Hola! Soy el asistente de Centro de Formación Profesional 655. ¿Cómo puedo ayudarte hoy?" }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: inputValue }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await submitMessage(inputValue)
      const assistantMessage: Message = { role: 'assistant', content: response }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: 'assistant', content: "Lo siento, no pude procesar tu solicitud. Por favor, inténtalo de nuevo." }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex h-full flex-col">
       <ScrollArea className="flex-1">
          <div className="p-4 sm:p-6">
            <ChatMessages messages={messages} />
            {isLoading && (
              <div className="flex items-start gap-4 pt-6">
                <Avatar className="h-10 w-10 border bg-primary text-primary-foreground">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2 pt-2">
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="h-4 w-48 rounded-md" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      <div className="border-t bg-card p-4">
        <div className="mx-auto max-w-2xl">
          <ChatInput
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onSubmit={handleSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
