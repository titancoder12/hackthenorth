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
function add_Message(text1, text2, fromUser = true) {
    const chatBox = document.getElementById('chat-box');
    const sendBtn = document.getElementById('send-btn');
    const endBtn = document.getElementById('end-btn');

    const messageContainer = document.createElement('div');
    messageContainer.className = 'input-container';
    const messageContainer2 = document.createElement('div');
    messageContainer2.className = 'input-container';

    console.log("setup message");

    const img = document.createElement('img');
    img.src = fromUser ? './g1.png' : './g2.png'; 
    img.alt = 'Logo';
    img.className = 'logo';

    console.log("logo setup");

    const img2 = document.createElement('img');
    img2.src = './g2.png'; 
    img2.alt = 'Logo';
    img2.className = 'logo';

    console.log("text setup");

    const textArea = document.createElement('textarea');
    textArea.className = 'input-box';
    textArea.value = text1;
    textArea.readOnly = true;
    textArea.rows = 4;
    textArea.style.resize = 'none';

    const textArea2 = document.createElement('textarea');
    textArea2.className = 'input-box';
    textArea2.value = text2;
    textArea2.readOnly = true;
    textArea2.rows = 4;
    textArea2.style.resize = 'none';

    console.log("creating message")
    messageContainer.appendChild(img);
    messageContainer.appendChild(textArea);
    messageContainer2.appendChild(textArea2);
    messageContainer2.appendChild(img2);
    chatBox.appendChild(messageContainer);
    chatBox.appendChild(messageContainer2);
    chatBox.scrollTop = chatBox.scrollHeight;
    console.log("Added message");
}

function startConversation(text1, text2, msgnum) {
    console.log("starting conversation");
    fetch("http://localhost:8000/api/createconversation/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"prompt1": text1, "prompt2": text2, "nmessages": Number(msgnum)})
    })
    .then(Response => {
        if (!Response.ok) {
            throw new Error('Network response was not ok ' + Response.statusText);
        }
        return Response.json();
    })
    .then(messages => {
        console.log(messages);
        messages = JSON.parse(messages);
        console.log(messages);
        for (let i = 0; i < messages["1"].length; i++) {
            console.log(messages["1"]);
            console.log(messages["2"]);
            add_Message(messages["1"][i], messages["2"][i]);
        }
    });
    console.log("done");
    return null;
}