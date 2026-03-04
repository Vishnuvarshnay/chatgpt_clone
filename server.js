import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Taaki .env files load ho sakein
import { generate } from './chatpot.js';

const app = express();
const port = process.env.PORT || 3001; // Port ko dynamic rakha hai

// Middlewares
app.use(cors());
app.use(express.json());

// Basic Health Check Route
app.get('/', (req, res) => {
    res.status(200).send('ChatDPT Backend is Online 🚀');
});

// Main Chat Endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message, threadId } = req.body;

        // 1. Validation (Strict)
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required and must be a string.' });
        }
        if (!threadId) {
            return res.status(400).json({ error: 'ThreadId is required for session tracking.' });
        }

        console.log(`[${threadId}] User Message: ${message}`);

        // 2. AI Generation
        // chatbot.js se 'generate' function call ho raha hai
        const result = await generate(message, threadId);

        // 3. Response
        res.status(200).json({ 
            success: true,
            message: result 
        });

    } catch (error) {
        // 4. Global Error Catching
        console.error('SERVER ERROR:', error.message);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error. Please try again later.' 
        });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server is running on: http://localhost:${port}`);
});