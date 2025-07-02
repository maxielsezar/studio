import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth/auth-form'
import { MessageCircle } from 'lucide-react'

export default async function LoginPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome to IntelliChat</h1>
          <p className="mt-2 text-muted-foreground">Sign in or create an account to continue</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
