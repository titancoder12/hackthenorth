// var corsAttr = new EnableCorsAttribute("*", "*", "*");
// config.EnableCors(corsAttr);

async function startConversation() {
    var text1 = document.getElementById("prompt1");
    var text2 = document.getElementById("prompt2");
    var msgnum = document.getElementById("messages");
    console.log(`${text1.value}, ${text2.value}`);
    // const request = new Request("/localhost:8000/api/createConversation", {
    //     method: "POST",
    //     body: JSON.stringify({prompt1: text1.value, prompt2: text2.value})
    // });
    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", "localhost:8000/api/createconversation");
    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader("Content-Type", "application/json");

    // xhr.onreadystatechange = function () {
    // if (xhr.readyState === 4) {
    //     console.log(xhr.status);
    //     console.log(xhr.responseText);
    // }};
    // console.log(Number(msgnum.value));
    // let data = JSON.stringify({prompt1: text1.value, prompt2: text2.value, nmessages: Number(msgnum.value)});

    // xhr.send(data);

    var response = await fetch("http://localhost:8000/api/createconversation/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt1: text1.value, prompt2: text2.value, nmessages: 5})
    })
    payload = await response.json();
    console.log(payload);
    sessionStorage.setItem("payload", JSON.stringify(payload));
    console.log(sessionStorage.getItem("payload"))
    //.then(data => {
    //     var payload = data.json();
    //     console.log(payload);
    //     var conversation = payload.conversation;
    //     console.log(conversation);
    // })
    // let conversationData = xhr.response;
    // console.log(conversationData);
}