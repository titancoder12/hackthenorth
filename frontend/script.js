document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const sendBtn = document.getElementById('send-btn');
    const endBtn = document.getElementById('end-btn');
    const userInput = document.getElementById('user-input');

    function addMessage(text, fromUser = true) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'input-container';
    
        // Create the image element
        const img = document.createElement('img');
        img.src = fromUser ? './g1.png' : './g2.png'; // Use different images based on user or bot
        img.alt = 'Logo';
        img.className = 'logo';
    
        // Create the text area
        const textArea = document.createElement('textarea');
        textArea.className = 'input-box';
        textArea.value = (fromUser ? 'User: ' : 'Bot: ') + text;
        textArea.readOnly = true;
        textArea.rows = 4;
        textArea.style.resize = 'none';
    
        // Add the image and text area to the message container
        messageContainer.appendChild(img);
        messageContainer.appendChild(textArea);
    
        // Add the message container to the chat box
        chatBox.appendChild(messageContainer);
    
        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    

    sendBtn.addEventListener('click', () => {
        const userMessage = "I hate chickens!";
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
