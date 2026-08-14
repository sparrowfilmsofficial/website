/**
 * Sparrow Films — AI Chatbot Controller
 * Powered by NVIDIA LLM API & info.md Grounding Context
 */

document.addEventListener('DOMContentLoaded', () => {
  const triggerBtn = document.getElementById('sparrow-chat-trigger');
  const chatModal = document.getElementById('sparrow-chat-modal');
  const closeBtn = document.getElementById('sparrow-chat-close');
  const chatForm = document.getElementById('sparrow-chat-form');
  const chatInput = document.getElementById('sparrow-chat-input');
  const chatMessages = document.getElementById('sparrow-chat-messages');
  const suggestionContainer = document.getElementById('sparrow-chat-suggestions');
  const badgeDot = document.getElementById('sparrow-chat-badge');

  if (!triggerBtn || !chatModal) return;

  let conversationHistory = [];
  let isProcessing = false;

  // Scroll behavior: hide when scrolling, reappear when scroll stops (matches WhatsApp float behavior)
  let scrollTimeout;
  setTimeout(() => {
    triggerBtn.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
    triggerBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-0');
  }, 500);

  window.addEventListener('scroll', () => {
    triggerBtn.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
    triggerBtn.classList.add('opacity-0', 'pointer-events-none', 'scale-0');

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      triggerBtn.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
      triggerBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-0');
    }, 800);
  });

  // Toggle Chat Modal
  const toggleChat = (show) => {
    const isVisible = show !== undefined ? show : chatModal.classList.contains('hidden');
    if (isVisible) {
      chatModal.classList.remove('hidden');
      setTimeout(() => {
        chatModal.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
        chatModal.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        chatInput.focus();
      }, 10);
      if (badgeDot) badgeDot.classList.add('hidden');
    } else {
      chatModal.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
      chatModal.classList.add('opacity-0', 'scale-95', 'translate-y-4');
      setTimeout(() => {
        chatModal.classList.add('hidden');
      }, 300);
    }
  };

  triggerBtn.addEventListener('click', () => toggleChat());
  if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !chatModal.classList.contains('hidden')) {
      toggleChat(false);
    }
  });

  // Basic Markdown Formatter
  const formatMarkdown = (text) => {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#FACC15]">$1</strong>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="underline text-[#FACC15] hover:text-white transition-colors">$1</a>');

    // Bullet points
    html = html.replace(/^\s*[\-\*]\s+(.*)$/gm, '<li class="ml-4 list-disc">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="my-2 space-y-1">$1</ul>');

    // Linebreaks
    html = html.replace(/\n/g, '<br/>');

    return html;
  };

  // Append Message to UI
  const appendMessage = (role, text) => {
    const isUser = role === 'user';
    const msgWrapper = document.createElement('div');
    msgWrapper.className = `flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-3 animate-fade-in`;

    const bubble = document.createElement('div');
    bubble.className = isUser
      ? 'max-w-[85%] bg-[#FACC15] text-[#111111] font-medium px-4 py-3 rounded-2xl rounded-tr-none text-[14px] leading-relaxed shadow-md'
      : 'max-w-[85%] bg-[#1A1A1A] text-white/90 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none text-[14px] leading-relaxed shadow-md';

    if (isUser) {
      bubble.textContent = text;
    } else {
      bubble.innerHTML = formatMarkdown(text);
    }

    msgWrapper.appendChild(bubble);
    chatMessages.appendChild(msgWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Show Typing Indicator
  const showTypingIndicator = () => {
    const indicatorWrapper = document.createElement('div');
    indicatorWrapper.id = 'sparrow-typing-indicator';
    indicatorWrapper.className = 'flex w-full justify-start mb-3 animate-fade-in';
    indicatorWrapper.innerHTML = `
      <div class="bg-[#1A1A1A] border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-md">
        <span class="w-2 h-2 bg-[#FACC15] rounded-full animate-bounce" style="animation-delay: 0ms"></span>
        <span class="w-2 h-2 bg-[#FACC15] rounded-full animate-bounce" style="animation-delay: 150ms"></span>
        <span class="w-2 h-2 bg-[#FACC15] rounded-full animate-bounce" style="animation-delay: 300ms"></span>
      </div>
    `;
    chatMessages.appendChild(indicatorWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Remove Typing Indicator
  const removeTypingIndicator = () => {
    const indicator = document.getElementById('sparrow-typing-indicator');
    if (indicator) indicator.remove();
  };

  // Send Message Handler
  const handleSendMessage = async (userText) => {
    const text = userText || chatInput.value.trim();
    if (!text || isProcessing) return;

    if (!userText) chatInput.value = '';
    isProcessing = true;

    // Hide suggestions after first message
    if (suggestionContainer) {
      suggestionContainer.classList.add('hidden');
    }

    appendMessage('user', text);
    conversationHistory.push({ role: 'user', content: text });

    showTypingIndicator();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory })
      });

      removeTypingIndicator();

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData.error || 'Unable to connect to AI server.';
        appendMessage('assistant', `⚠️ ${errMsg}`);
      } else {
        const data = await response.json();
        const reply = data.reply || 'No response generated.';
        appendMessage('assistant', reply);
        conversationHistory.push({ role: 'assistant', content: reply });
      }
    } catch (err) {
      removeTypingIndicator();
      appendMessage('assistant', '⚠️ Connection error. Please check your network connection.');
      console.error('Chat error:', err);
    } finally {
      isProcessing = false;
      chatInput.focus();
    }
  };

  // Form Submit Listener
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSendMessage();
    });
  }

  // Suggestion Click Listeners
  if (suggestionContainer) {
    suggestionContainer.querySelectorAll('.sparrow-suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-prompt');
        if (prompt) {
          handleSendMessage(prompt);
        }
      });
    });
  }
});
