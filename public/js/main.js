const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();


socket.on("message", message => {
    console.log(message);
    outputMessage(message);
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
// Message
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    // Emit msg to server
    socket.emit("chatMessage", msg);
    // Clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})
// Output message to DOM
function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `  <p class="meta">Brad <span>9:12pm</span></p>
<p class="text">
 ${message};
</p>`
    document.querySelector(".chat-messages").appendChild(div);
}
