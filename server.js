const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");


const app = express();
const server = http.createServer(app);
const io = socketio(server);
// Set static folder
app.use(express.static(path.join(__dirname, "public")));
const botName = "Chat-room Bot"

// run when client connects
io.on("connection", (socket) => {
    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to Chat-room!"));
    // when user connects
    socket.broadcast.emit("message", formatMessage(botName, "A user has joined the chat"));
    // when client dissconnertcs
    socket.on("disconnect", () => {
        io.emit("message", formatMessage(botName, "A user has left the chat"))
    })
    // Listen for chat msg
    socket.on("chatMessage", (msg) => {
        io.emit("message", formatMessage("User", msg));
    })
})
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
