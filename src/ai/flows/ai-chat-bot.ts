'use client';

/**
 * @fileOverview Un flujo de chatbot de IA que responde a las consultas de los usuarios.
 *
 * - aiChatBot - Una función que maneja la interacción del chatbot.
 * - AIChatBotInput - El tipo de entrada para la función aiChatBot.
 * - AIChatBotOutput - El tipo de retorno para la función aiChatBot.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatBotInputSchema = z.object({
  query: z.string().describe('La consulta del usuario.'),
});
export type AIChatBotInput = z.infer<typeof AIChatBotInputSchema>;

const AIChatBotOutputSchema = z.object({
  response: z.string().describe('La respuesta del chatbot de IA.'),
});
export type AIChatBotOutput = z.infer<typeof AIChatBotOutputSchema>;

export async function aiChatBot(input: AIChatBotInput): Promise<AIChatBotOutput> {
  return aiChatBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatBotPrompt',
  input: {schema: AIChatBotInputSchema},
  output: {schema: AIChatBotOutputSchema},
  prompt: `Eres un chatbot de IA diseñado para dar información útil del Centro de Formación Profesional 655.

Aquí tienes información importante sobre el centro:
- Dirección (Sede Central): Chacabuco 1036, ciudad de Esquel. Aquí funcionan los talleres de Mecánica, Construcciones Civiles, Informática, Administración, etc.
- Anexo: Sáenz Peña 2627, ciudad de Esquel. Aquí se encuentran las áreas de Carpintería y Gastronomía.
- Sitio web: https://cfp655esquel.edu.ar/cfp655/
- Horario de atención: de 8:00hs a 18:00hs
- Inscripciones: Para realizar inscripciones, visita https://cfp655esquel.edu.ar/cfp655/inscripciones/
- Costo: Todas las capacitaciones que dicta este Centro son absolutamente gratuitas.

Responde a la siguiente consulta del usuario:

Query: {{{query}}}`,
});

const aiChatBotFlow = ai.defineFlow(
  {
    name: 'aiChatBotFlow',
    inputSchema: AIChatBotInputSchema,
    outputSchema: AIChatBotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
