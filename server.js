const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Load info.md context
let infoContext = '';
const infoPath = path.join(__dirname, 'info.md');
try {
  if (fs.existsSync(infoPath)) {
    infoContext = fs.readFileSync(infoPath, 'utf8');
  }
} catch (err) {
  console.error('Error loading info.md context:', err);
}

// System prompt template
const getSystemPrompt = () => {
  return `You are Kuchu Puchu AI, the official intelligent assistant for Sparrow Films (India's premier video production house and content agency in Noida & Delhi NCR).

Your goal is to assist brand founders, CMOs, marketers, and site visitors by providing accurate, enthusiastic, and concise information about Sparrow Films.

STUDIO KNOWLEDGE BASE (info.md):
====================================
${infoContext}
====================================

RESPONSE GUIDELINES:
1. Always maintain a professional, high-energy, creative tone matching Sparrow Films' "Crafted for Emotion" philosophy.
2. Ground your answers strictly in the knowledge base provided above.
3. If users ask about services, mention Content Consultation, Monthly Reels/Shorts, Brand Films, Advertisements, or End-to-End Production.
4. If users ask about booking a project or strategy call, invite them to use the contact form, email contact@sparrowfilms.in, or call +91 95089 53699.
5. Use clean Markdown formatting (bold points, short paragraphs, bullet lists) for readability. Keep responses punchy and avoid unnecessarily long essays unless asked.`;
};

// API Endpoint for Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'NVIDIA_API_KEY is not configured in the server environment (.env file).'
      });
    }

    const { messages, message } = req.body;
    let userConversation = [];

    if (Array.isArray(messages) && messages.length > 0) {
      userConversation = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: String(m.content)
      }));
    } else if (message) {
      userConversation = [{ role: 'user', content: String(message) }];
    } else {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    const systemMessage = { role: 'system', content: getSystemPrompt() };
    const fullMessages = [systemMessage, ...userConversation];

    // Primary model configured by user in .env, followed by verified backup models
    const configuredModel = process.env.LLM_MODEL || 'minimaxai/minimax-m3';
    const modelsToTry = Array.from(new Set([
      configuredModel,
      'meta/llama-3.1-8b-instruct',
      'meta/llama-3.3-70b-instruct'
    ]));

    let lastError = null;
    let replyContent = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Sending chat completion request to model [${modelName}]...`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey.trim()}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: fullMessages,
            temperature: 0.5,
            top_p: 0.7,
            max_tokens: 800
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            replyContent = data.choices[0].message.content;
            console.log(`Successfully received completion from [${modelName}]`);
            break; // Success!
          }
        } else {
          const errText = await response.text();
          lastError = `NVIDIA API (${modelName}) returned status ${response.status}: ${errText}`;
          console.warn(lastError);
        }
      } catch (err) {
        lastError = `Error connecting to model ${modelName}: ${err.message}`;
        console.warn(lastError);
      }
    }

    if (replyContent) {
      return res.json({ reply: replyContent });
    } else {
      return res.status(502).json({
        error: 'Failed to generate response from NVIDIA LLM service.',
        details: lastError
      });
    }

  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error processing chat request.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Sparrow Films Server running on http://localhost:${PORT}`);
});
