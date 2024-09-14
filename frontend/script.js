document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const sendBtn = document.getElementById('send-btn');
    const endBtn = document.getElementById('end-btn');
    const userInput = document.getElementById('user-input');

    function addMessage(text, fromUser = true) {
        const message = document.createElement('p');
        message.textContent = (fromUser ? 'User: ' : 'Bot: ') + text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight; 
    }

    sendBtn.addEventListener('click', () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage);
            userInput.value = '';
            setTimeout(() => addMessage('This is a bot response.'), 500);
        }
    });

    endBtn.addEventListener('click', () => {
        addMessage('Conversation ended.');
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});
