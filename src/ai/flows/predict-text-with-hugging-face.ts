'use server';

/**
 * @fileOverview A Genkit flow for interacting with a Hugging Face AI model to get text predictions.
 *
 * - predictTextWithHuggingFace - A function that handles sending text to a Hugging Face API and retrieving predictions.
 * - PredictTextWithHuggingFaceInput - The input type for the predictTextWithHuggingFace function.
 * - PredictTextWithHuggingFaceOutput - The return type for the predictTextWithHuggingFace function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictTextWithHuggingFaceInputSchema = z.object({
  text: z.string().describe('The Arabic text input for the Hugging Face model.'),
});
export type PredictTextWithHuggingFaceInput = z.infer<typeof PredictTextWithHuggingFaceInputSchema>;

const PredictTextWithHuggingFaceOutputSchema = z.object({
  prediction: z.any().describe('The prediction output from the Hugging Face model.'),
});
export type PredictTextWithHuggingFaceOutput = z.infer<typeof PredictTextWithHuggingFaceOutputSchema>;

export async function predictTextWithHuggingFace(
  input: PredictTextWithHuggingFaceInput
): Promise<PredictTextWithHuggingFaceOutput> {
  return predictTextWithHuggingFaceFlow(input);
}

const predictTextWithHuggingFaceFlow = ai.defineFlow(
  {
    name: 'predictTextWithHuggingFaceFlow',
    inputSchema: PredictTextWithHuggingFaceInputSchema,
    outputSchema: PredictTextWithHuggingFaceOutputSchema,
  },
  async (input) => {
    // IMPORTANT: Ensure 'HF_MODEL_ID' and 'HF_TOKEN' are securely stored as environment variables.
    // You need to replace 'YOUR_MODEL_ID' and 'YOUR_HF_TOKEN' with actual values in your .env file or environment setup.
    const HF_MODEL_ID = process.env.HF_MODEL_ID || 'YOUR_MODEL_ID_HERE'; // Replace with your Hugging Face model ID
    const HF_TOKEN = process.env.HF_TOKEN || 'YOUR_HF_TOKEN_HERE'; // Replace with your Hugging Face API Token

    if (HF_MODEL_ID === 'YOUR_MODEL_ID_HERE' || !HF_MODEL_ID) {
      throw new Error('Hugging Face model ID is not configured in environment variables (HF_MODEL_ID). Please update .env.');
    }
    if (HF_TOKEN === 'YOUR_HF_TOKEN_HERE' || !HF_TOKEN) {
      throw new Error('Hugging Face API token is not configured in environment variables (HF_TOKEN). Please update .env.');
    }

    const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL_ID}`;

    try {
      const response = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: input.text }),
      });

      if (!response.ok) {
        let errorMessage = `Hugging Face API error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage += ` - ${JSON.stringify(errorData)}`;
        } catch (jsonError) {
          // If response is not JSON, just use status text
        }
        throw new Error(errorMessage);
      }

      const prediction = await response.json();
      return { prediction };
    } catch (error: any) {
      console.error('Error calling Hugging Face API:', error);
      throw new Error(`Failed to get prediction from Hugging Face: ${error.message}`);
    }
  }
);
