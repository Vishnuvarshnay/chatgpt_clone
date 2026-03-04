import 'dotenv/config'; // API Keys safe rakhne ke liye
import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import { tavily } from '@tavily/core';

const app = express();
app.use(cors()); // Frontend access allow karne ke liye
app.use(express.json());

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// In-memory chat history (Har session ke liye alag messages)
const sessions = {};

async function webSearch(query) {
    console.log(`Searching web for: ${query}`);
    const response = await tvly.search(query, { searchDepth: "basic", maxResults: 3 });
    return response.results.map((r) => r.content).join('\n\n');
}

app.post('/chat', async (req, res) => {
    const { message, threadId = 'default' } = req.body;

    // Session initialize karein agar nahi hai toh
    if (!sessions[threadId]) {
        sessions[threadId] = [
            { role: 'system', content: `You are a smart personal assistant. Use webSearch tool for real-time info. Current date: ${new Date().toLocaleDateString()}` }
        ];
    }

    const messages = sessions[threadId];
    messages.push({ role: 'user', content: message });

    try {
        let toolCallsMade = false;

        // Loop taaki AI tool use karne ke baad final answer de sake
        while (true) {
            const completion = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                tools: [{
                    type: 'function',
                    function: {
                        name: 'webSearch',
                        description: 'Search latest info on internet',
                        parameters: {
                            type: 'object',
                            properties: { query: { type: 'string' } },
                            required: ['query']
                        }
                    }
                }],
                tool_choice: 'auto'
            });

            const responseMessage = completion.choices[0].message;
            messages.push(responseMessage);

            if (!responseMessage.tool_calls) {
                // Agar koi tool nahi bulaya, toh final answer bhej do
                return res.json({ message: responseMessage.content });
            }

            // Tool call process karein
            for (const tool of responseMessage.tool_calls) {
                const args = JSON.parse(tool.function.arguments);
                const result = await webSearch(args.query);

                messages.push({
                    tool_call_id: tool.id,
                    role: 'tool',
                    name: 'webSearch',
                    content: result
                });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Sorry, I encountered an error." });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));