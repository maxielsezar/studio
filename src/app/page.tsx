import { ChatInterface } from '@/components/chat/chat-interface'
import Image from 'next/image'

export default async function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW1LevXfvlvDPTMa8Ua5RuaLsTwuSgLiXDeCu1sMvhwaQY5Okfu4mJQjtojFWAJTrCzg&usqp=CAU"
            alt="Centro de Formación Profesional 655 Logo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <h1 className="text-lg font-semibold">Centro de Formación Profesional 655</h1>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  )
}
