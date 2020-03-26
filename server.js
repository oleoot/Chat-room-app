const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");



const app = express();
const server = http.createServer(app);
const io = socketio(server);
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// run when client connects
io.on("connection", (socket) => {
    // Welcome current user
    socket.emit("message", "Welcome to Chat-room!");
    // when user connects
    socket.broadcast.emit("message", "A user has joined the chat");
    // when client dissconnertcs
    socket.on("disconnect", () => {
        io.emmit("message", "A user has left the chat")
    })
})
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
