'use server';

/**
 * @fileOverview An AI chatbot flow that responds to user queries.
 *
 * - aiChatBot - A function that handles the chatbot interaction.
 * - AIChatBotInput - The input type for the aiChatBot function.
 * - AIChatBotOutput - The return type for the aiChatBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatBotInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type AIChatBotInput = z.infer<typeof AIChatBotInputSchema>;

const AIChatBotOutputSchema = z.object({
  response: z.string().describe('The AI chatbot response.'),
});
export type AIChatBotOutput = z.infer<typeof AIChatBotOutputSchema>;

export async function aiChatBot(input: AIChatBotInput): Promise<AIChatBotOutput> {
  return aiChatBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatBotPrompt',
  input: {schema: AIChatBotInputSchema},
  output: {schema: AIChatBotOutputSchema},
  prompt: `You are a helpful AI chatbot. Respond to the following user query:

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
