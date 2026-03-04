import Groq from 'groq-sdk';
import { tavily } from '@tavily/core';
import NodeCache from 'node-cache';

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Cache with 24h TTL
const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

export async function generate(userMessage, threadId) {
    const systemPrompt = {
        role: 'system',
        content: `You are a smart personal assistant. 
                  Answer directly if you know. Use webSearch for real-time/unknown info.
                  Current date: ${new Date().toUTCString()}`
    };

    // Retrieve history or start new
    let messages = cache.get(threadId) || [systemPrompt];

    messages.push({ role: 'user', content: userMessage });

    const MAX_RETRIES = 5; // 10 is too much, usually 2-3 is enough
    let count = 0;

    try {
        while (count < MAX_RETRIES) {
            count++;

            const response = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                temperature: 0.2, // Slightly more natural than 0
                messages: messages,
                tools: [{
                    type: 'function',
                    function: {
                        name: 'webSearch',
                        description: 'Search the latest information on the internet.',
                        parameters: {
                            type: 'object',
                            properties: {
                                query: { type: 'string', description: 'Search query' },
                            },
                            required: ['query'],
                        },
                    },
                }],
                tool_choice: 'auto',
            });

            const assistantMessage = response.choices[0].message;
            messages.push(assistantMessage);

            // If no tool calls, we are done
            if (!assistantMessage.tool_calls) {
                // Keep only last 15 messages to save context/tokens
                if (messages.length > 15) {
                    messages = [systemPrompt, ...messages.slice(-14)];
                }
                cache.set(threadId, messages);
                return assistantMessage.content;
            }

            // Handle Tool Calls
            for (const tool of assistantMessage.tool_calls) {
                if (tool.function.name === 'webSearch') {
                    const { query } = JSON.parse(tool.function.arguments);
                    const toolResult = await webSearch({ query });

                    messages.push({
                        tool_call_id: tool.id,
                        role: 'tool',
                        name: 'webSearch',
                        content: toolResult,
                    });
                }
            }
        }
        return "I'm having trouble finding a definitive answer. Could you rephrase?";
    } catch (error) {
        console.error("Groq/Tavily Error:", error);
        return "Sorry, I encountered a technical issue. Please try again later.";
    }
}

async function webSearch({ query }) {
    try {
        console.log(`🔍 Searching: ${query}`);
        const response = await tvly.search(query, {
            searchDepth: "basic",
            maxResults: 5
        });
        return response.results.map(r => `Source: ${r.title}\nContent: ${r.content}`).join('\n\n');
    } catch (err) {
        console.error("Tavily Error:", err);
        return "Search failed. Proceed with internal knowledge.";
    }
}