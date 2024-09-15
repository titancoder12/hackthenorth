function busywait(time) {
    const start = Date.now();
    while ((Date.now() - start) < time) {}
}

document.addEventListener('DOMContentLoaded', () => {

    const chatBox = document.getElementById('chat-box');
    const sendBtn = document.getElementById('send-btn');
    const endBtn = document.getElementById('end-btn');
    // const userInput = document.getElementById('user-input');


    function addMessage(text, fromUser = true) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'input-container';
        const messageContainer2 = document.createElement('div');
        messageContainer2.className = 'input-container';
    
        const img = document.createElement('img');
        img.src = fromUser ? './g1.png' : './g2.png'; 
        img.alt = 'Logo';
        img.className = 'logo';

        const img2 = document.createElement('img');
        img2.src = './g2.png'; 
        img2.alt = 'Logo';
        img2.className = 'logo';
    
  
        const textArea = document.createElement('textarea');
        textArea.className = 'input-box';
        textArea.value = (fromUser ? 'User: ' : 'Bot: ') + text;
        textArea.readOnly = true;
        textArea.rows = 4;
        textArea.style.resize = 'none';

        const textArea2 = document.createElement('textarea');
        textArea2.className = 'input-box';
        textArea2.value = (fromUser ? 'User: ' : 'Bot: ') + text;
        textArea2.readOnly = true;
        textArea2.rows = 4;
        textArea2.style.resize = 'none';
    

        messageContainer.appendChild(img);
        messageContainer.appendChild(textArea);
        messageContainer2.appendChild(textArea2);
        messageContainer2.appendChild(img2);
        chatBox.appendChild(messageContainer);
        chatBox.appendChild(messageContainer2);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    window.onload = function() {
        document.getElementById('infoModal').style.display = 'block';
    };
    
    document.getElementById('start-btn').addEventListener('click', function() {
        const userMessage = "I hate chickens!";
        document.getElementById('infoModal').style.display = 'none';
        document.getElementById('loading-modal').style.display = 'flex';
        loading(); 
    
        setTimeout(() => {
            document.getElementById('loading-modal').style.display = 'none';
            addMessage(userMessage)
        }, 5000); 
    });
    
    function loading() {
        const images = [
            'goose1.png',
            'goose3.png',
            'goose5.png',
            'goose2.png',
        ];
    
        let currentIndex = 0;
        const loadingImage = document.getElementById('loading-image');
    
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length; 
            loadingImage.style.opacity = 0; 
    
            setTimeout(() => {
                loadingImage.src = images[currentIndex]; 
                loadingImage.style.opacity = 1; 
            }, 400);
        }, 1000); 
    }

    sendBtn.addEventListener('click', () => {
        const userMessage = "I hate chickens!";
        if (userMessage) {
                addMessage(userMessage);
        }
    });
    

    endBtn.addEventListener('click', () => {
        addMessage('Conversation ended.');
    });

    // userInput.addEventListener('keypress', (e) => {
    //     if (e.key === 'Enter') {
    //         sendBtn.click();
    //     }
    // });

    
});

// Typewriter Animation
const typewriterText = `
How it works?

First you need to provide some instructions to Goose 1 and Goose 2.
You can define how you want them to behave and respond.
When you're done, click "Start"!
`;

let i = 0;
const speed = 30;

function typeWriter() {
if (i < typewriterText.length) {
    document.getElementById("typewriter-text").innerHTML += typewriterText.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
}
}

typeWriter();

function loading() {
    const images = [
        'goose1.png',
        'goose2.png',
        'goose3.png',
        'goose4.png',
        'goose5.png',
        'goose6.png'
    ];

    let currentIndex = 0;
    const loadingImage = document.getElementById('loading-image');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; 
        loadingImage.style.opacity = 0; 

        setTimeout(() => {
            loadingImage.src = images[currentIndex]; 
            loadingImage.style.opacity = 1; 
        }, 500); 
    }, 500);

    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1000); 
};
