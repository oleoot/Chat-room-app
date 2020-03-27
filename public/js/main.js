const chatForm = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.querySelector("#room-name");
const userList = document.querySelector("#users");
// get username and room form url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();
// Join chatroom
socket.emit("joinRoom", { username, room })
// Get room and users
socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
})
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
    div.innerHTML = `  <p class="meta">${message.username} <span>${message.time}</span></p>
<p class="text">
 ${message.text};
</p>`
    document.querySelector(".chat-messages").appendChild(div);
}
// add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}
// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `${users.map(user =>
        `<li>${user.username}</li>`).join("")}`;
}
