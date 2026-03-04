const input = document.querySelector('#input');
const chatContainer = document.querySelector('#chat-container');
const askBtn = document.querySelector('#ask');

// Unique session ID
const threadId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

// 1. Dynamic Button State & Auto-resize
input?.addEventListener('input', () => {
    // Button ko tabhi enable karein jab text ho
    askBtn.disabled = !input.value.trim();
    
    // Textarea ki height content ke hisaab se badhayein
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
});

input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleAsk();
    }
});

askBtn?.addEventListener('click', handleAsk);

const scrollToBottom = () => {
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth' // Isse smooth animation aayegi
    });
};
function createMessageBubble(role, text) {
    const wrapper = document.createElement('div');
    wrapper.className = `flex w-full my-4 ${role === 'user' ? 'justify-end' : 'justify-start'} animate-msg`;
    
    const msg = document.createElement('div');
    msg.className = role === 'user' 
        ? `bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] shadow-md`
        : `bg-neutral-700 text-gray-100 p-4 rounded-2xl rounded-tl-none max-w-[85%] border border-neutral-600 prose prose-invert`;

    if (role === 'assistant') {
        msg.innerHTML = marked.parse(text); 
    } else {
        msg.textContent = text;
    }
    
    wrapper.appendChild(msg);
    chatContainer?.appendChild(wrapper);
    scrollToBottom();
    return msg;
}

async function handleAsk() {
    const text = input.value.trim();
    if (!text) return;

    // 2. UI Updates & Disable Input
    createMessageBubble('user', text);
    input.value = '';
    input.style.height = 'auto'; // Reset height
    askBtn.disabled = true; // Disable button while AI responds

    const loadingBubble = document.createElement('div');
    loadingBubble.className = 'text-neutral-500 italic text-sm my-2 animate-pulse flex items-center gap-2';
    loadingBubble.innerHTML = `<span>⚡</span> AI is searching & thinking...`;
    chatContainer.appendChild(loadingBubble);
    scrollToBottom();

    try {
        const assistantResponse = await callServer(text);
        loadingBubble.remove();
        createMessageBubble('assistant', assistantResponse);
    } catch (error) {
        console.error(error);
        loadingBubble.className = 'text-red-400 text-sm my-2';
        loadingBubble.textContent = "⚠️ Error: Could not connect to the server.";
    } finally {
        // Re-enable button agar user kuch likhta hai
        askBtn.disabled = !input.value.trim();
    }
}

async function callServer(inputText) {
    // 3. Robust Fetch with Timeout logic
    const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId: threadId, message: inputText }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server error');
    }

    const result = await response.json();
    return result.message;
}