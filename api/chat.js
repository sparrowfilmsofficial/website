const fs = require('fs');
const path = require('path');

// System prompt template generator
const getSystemPrompt = (infoContext) => {
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

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'NVIDIA_API_KEY is not configured in Vercel Environment Variables.'
      });
    }

    // Load info.md from root directory
    let infoContext = '';
    try {
      const infoPath = path.join(process.cwd(), 'info.md');
      if (fs.existsSync(infoPath)) {
        infoContext = fs.readFileSync(infoPath, 'utf8');
      }
    } catch (err) {
      console.error('Error loading info.md in Vercel serverless function:', err);
    }

    const { messages, message } = req.body || {};
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

    const systemMessage = { role: 'system', content: getSystemPrompt(infoContext) };
    const fullMessages = [systemMessage, ...userConversation];

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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

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
            break;
          }
        } else {
          const errText = await response.text();
          lastError = `NVIDIA API (${modelName}) returned status ${response.status}: ${errText}`;
        }
      } catch (err) {
        lastError = `Error connecting to model ${modelName}: ${err.message}`;
      }
    }

    if (replyContent) {
      return res.status(200).json({ reply: replyContent });
    } else {
      return res.status(502).json({
        error: 'Failed to generate response from NVIDIA LLM service.',
        details: lastError
      });
    }

  } catch (error) {
    console.error('Vercel serverless chat error:', error);
    return res.status(500).json({ error: 'Internal server error processing chat request.' });
  }
};
