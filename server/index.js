const express = require("express");
const cors = require("cors");
const app = express();
const http = require('http').Server(app)
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
})
const PORT = 3001;

const users = []


socketIO.on("connection", (socket) => {
    console.log(`${socket.id} user connected`)
    socket.on('message', (data) => {
        socketIO.emit('response', data)
    })
    socket.on('typing', (data) => socket.emit('responseTyping', data))
    socket.on('newUser', (data) => {
        users.push(data)
        socketIO.emit('responseNewUser', users)
    })
    socket.on("disconnection", () => {
        console.log(`${socket.id} - disconnected`)
    })
})



http.listen(PORT, () => {
    try {
        console.log("server work!");
    } catch (error) {
        console.log(error);
    }
})