'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { login, signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Terminal } from 'lucide-react'

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" aria-disabled={pending}>
      {pending ? 'Enviando...' : text}
    </Button>
  )
}

export function AuthForm() {
  const [loginState, loginAction] = useActionState(login, undefined)
  const [signupState, signupAction] = useActionState(signup, undefined)

  return (
    <Card>
      <CardContent className="p-4">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="signup">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="space-y-4 pt-4">
              <form action={loginAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="m@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                {loginState?.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{loginState.error}</AlertDescription>
                  </Alert>
                )}
                <SubmitButton text="Iniciar sesión" />
              </form>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="space-y-4 pt-4">
              <form action={signupAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" name="email" type="email" placeholder="m@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Contraseña</Label>
                  <Input id="password-signup" name="password" type="password" required />
                </div>
                {signupState?.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{signupState.error}</AlertDescription>
                  </Alert>
                )}
                {signupState?.message && (
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>¡Atención!</AlertTitle>
                    <AlertDescription>{signupState.message}</AlertDescription>
                  </Alert>
                )}
                <SubmitButton text="Registrarse" />
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
