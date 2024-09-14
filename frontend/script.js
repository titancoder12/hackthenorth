function startConversation() {
    var text1 = document.getElementById("prompt1");
    var text2 = document.getElementById("prompt2");
    console.log(`${text1.value}, ${text2.value}`);
    // const request = new Request("/localhost:8000/api/createConversation", {
    //     method: "POST",
    //     body: JSON.stringify({prompt1: text1.value, prompt2: text2.value})
    // });
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/localhost:8000/api/createConversation");
    // xhr.setRequestHeader("Accept", "application/json");
    // xhr.setRequestHeader("Content-Type", "application/json");

    // xhr.onreadystatechange = function () {
    // if (xhr.readyState === 4) {
    //     console.log(xhr.status);
    //     console.log(xhr.responseText);
    // }};

    let data = JSON.stringify({prompt1: text1.value, prompt2: text2.value});

    xhr.send(data);
    let conversationData = xhr.response;
    console.log(conversationData)
}