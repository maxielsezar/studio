'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email({ message: 'Dirección de correo electrónico inválida.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
})

export async function login(prevState: any, formData: FormData) {
  const supabase = createClient()
  const parsed = schema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(', ') }
  }
  
  const { email, password } = parsed.data

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(prevState: any, formData: FormData) {
  const supabase = createClient()
  const parsed = schema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return { error: parsed.error.errors.map((e) => e.message).join(', ') }
  }
  
  const { email, password } = parsed.data

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }
  
  return { message: 'Revisa tu correo electrónico para ver el enlace de confirmación y completar el registro.' }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
