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

const sockets = {}
const chatUsers = {}

function newId(){
    const id = Math.trunc(Math.random()*100) + '' + Math.trunc(Math.random()*100) + '' + Math.trunc(Math.random()*100) + '' + Math.trunc(Math.random()*100) + '' + Math.trunc(Math.random()*100);
    return id;
}


socketIO.on("connection", (socket) => {
    socket.on('message', (message) => {
        socketIO.emit('newMessage', {
            text: message.text,
            from: socket.data.name,
            chatId: message.chatId
        })
    });
    socket.on('typing', (data) => socket.emit('responseTyping', data))
    socket.on('newUser', (nickname) => {
        const user = {
            name: nickname,
            chats: {},
        }
        sockets[user.name] = socket;
        socket.data.user = user;
        socketIO.emit('allUsers', Object.keys(sockets));
        console.log(Object.keys(sockets));
    })
    socket.on('newChat',(data = null)=>{
        const user = socket.data.user;
        const chatId = newId();
        user.chats[chatId] = {
            name: data,
            members: [user]
        };
        socket.join(chatId);
    })
    socket.on('allChats',()=>{
        const user = users[socket.data.name];
        socketIO.emit('allChats', user.chats.map((chat, key) =>{
            return {
                name: chat.name,
                members: chat.members.map(member => member.name),
                chatId: key
            }
        }))
    })
    socket.on('inviteChat',(data)=>{
        const user = socket.data.user;
        const newMemberSocket = sockets[data.name];
        user.chats[data.chatId].push(newMemberSocket.data.user);
        newMemberSocket.join(data.chatId);
    })
    socket.on("disconnection", (data) => {
    })
})


http.listen(PORT, () => {
    try {
        console.log("server work!");
    } catch (error) {
        console.log(error);
    }
})