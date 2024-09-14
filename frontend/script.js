function startConversation() {
    var text1 = document.getElementById("prompt1");
    var text2 = document.getElementById("prompt2");
    console.log(`${text1.value}, ${text2.value}`);
    const request = new Request("/localhost:8000/api/createConversation", {
        method: "POST",
        body: JSON.stringify({prompt1: text1.value, prompt2: text2.value})
    });
}