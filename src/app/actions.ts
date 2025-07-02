'use server'

import { aiChatBot } from '@/ai/flows/ai-chat-bot'
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function submitMessage(message: string) {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }
  
  const { response } = await aiChatBot({ query: message })
  return response
}
