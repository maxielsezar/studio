import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth/auth-form'
import Image from 'next/image'

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
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhW1LevXfvlvDPTMa8Ua5RuaLsTwuSgLiXDeCu1sMvhwaQY5Okfu4mJQjtojFWAJTrCzg&usqp=CAU"
            alt="Centro de Formación Profesional 655 Logo"
            width={64}
            height={64}
            className="mb-4 rounded-full"
          />
          <h1 className="text-3xl font-bold text-foreground">Bienvenido a Centro de Formación Profesional 655</h1>
          <p className="mt-2 text-muted-foreground">Inicia sesión o crea una cuenta para continuar</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
