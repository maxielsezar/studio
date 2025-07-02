import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Bot, User } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ChatMessagesProps = {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            'flex items-start gap-4',
            message.role === 'user' && 'justify-end'
          )}
        >
          {message.role === 'assistant' && (
            <Avatar className='h-10 w-10 border bg-primary text-primary-foreground'>
              <AvatarFallback>
                <Bot />
              </AvatarFallback>
            </Avatar>
          )}
          <div
            className={cn(
              'rounded-lg p-3 text-sm max-w-[80%]',
              message.role === 'user'
                ? 'bg-accent text-accent-foreground rounded-br-none'
                : 'bg-card rounded-bl-none'
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          {message.role === 'user' && (
            <Avatar className='h-10 w-10 border bg-accent text-accent-foreground'>
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </div>
  )
}
