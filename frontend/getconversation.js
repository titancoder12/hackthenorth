async function startConversation(text1, text2, msgnum) {
    var response = await fetch("http://localhost:8000/api/createconversation/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"prompt1": text1, "prompt2": text2, "nmessages": Number(msgnum)})
    });
    payload = await response.json();
    console.log(payload.conversation);
    return payload.conversation;
}