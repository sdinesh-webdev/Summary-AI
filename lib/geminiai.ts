import { GoogleGenerativeAI } from "@google/generative-ai";
import { Summary_system_prompt } from "@/utils/prompt"; // Import the prompt

// === AI Text Summarization Function ===
// Setup Gemini AI with API key
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Main function to generate summary using Gemini AI
export async function summarizeWithGeminiAI(text: string): Promise<string> {
    // 1. Initialize AI model
    // 2. Combine system prompt with input text
    // 3. Generate and return summary
    // 4. Handle any errors during the process
    try {
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `${Summary_system_prompt}\n\n${text}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (err: any) {
        console.error('Gemini AI error:', err);
        throw new Error(`Gemini AI summarization failed: ${err.message}`);
    }
}