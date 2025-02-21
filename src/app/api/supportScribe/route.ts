import { NextRequest, NextResponse } from "next/server";
import { CohereClientV2 } from 'cohere-ai';

// Initialize the Cohere client with the API key
const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY!,
});

// Define the API route
export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const { mode, input } = await req.json();

        // Validate request
        if (!input || !mode) {
            return NextResponse.json({ message: 'Input and mode are required' }, { status: 400 });
        }

        const prompt = mode === 'support'
            ? `As a customer support agent, respond to the following inquiry: "${input}"`
            : `Write a professional email based on the following brief: "${input}"`;

        // Use the Cohere API for analysis
        const analysisResponse = await cohere.chat({
            model: 'command-r-plus',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        // Extract the response content
        const contents = Array.isArray(analysisResponse.message)
            ? analysisResponse.message.map(msg => msg.content).join('\n') || 'No response from Cohere API'
            : analysisResponse.message?.content || 'No response from Cohere API';
 
        return NextResponse.json({ response: contents }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}