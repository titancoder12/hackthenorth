// async function startConversation(text1, text2, msgnum) {
//     var response = await fetch("http://localhost:8000/api/createconversation/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({"prompt1": text1, "prompt2": text2, "nmessages": Number(msgnum)})
//     });
//     payload = await response.json();
//     console.log(payload.conversation);
//     return payload.conversation;
// }
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

function startConversation(text1, text2, msgnum) {
    fetch("http://localhost:8000/api/createconversation/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"prompt1": text1, "prompt2": text2, "nmessages": Number(msgnum)})
    }).then(response => response.json())
    .then(messages => {
        console.log(messages);
        console.log(messages[1]);
        console.log(messages.type);

        for (let i = 0; i < messages.length; i++) {
            addMessage(messages[0][i]);
            addMessage(messages[1][i]);
        }
    });
    return null;
}