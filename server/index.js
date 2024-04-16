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
const users = {}

function newId() {
    const id = Math.trunc(Math.random() * 10000000000000);
    return id;
}

function getAllUsers() {
    return Object.keys(users).map(id => {
        return {
            name: users[id].name,
            id: id
        }
    })
}

function getUserChats(userId) {
    return users[userId].chats.map(chat => {
        return {
            chatId: chat,
            members: Array.from(socketIO.sockets.adapter.rooms.get(chat)).map(val => val)
        }
    })
}

function joinChat(userId, chatId) {
    users[userId].chats.push(chatId);
    const socket = socketIO.sockets.sockets.get(users[userId].socket);
    if (socket) {
        socket.join(chatId);
        socket.emit("chatList", getUserChats(userId));
        socketIO.to(chatId).emit("alert", {
            chatId: chatId,
            message: `Пользователь ${users[userId].name} присоединился к чату`,
        });
    };
}


socketIO.on("connection", (socket) => {
    socket.on('message', (message) => {
        socketIO.to(message.chatId).emit('newMessage', {
            text: message.text,
            from: users[sockets[socket.id]].name,
            chatId: message.chatId
        })
    });

    socket.on("getAllUsers", () => {
        socket.emit("allUsers", getAllUsers());
    })
    // 
    socket.on('newUser', (nickname) => {
        const user = {
            id: newId(),
            name: nickname,
            socket: socket.id,
            chats: [],
        }
        sockets[socket.id] = user.id;
        users[user.id] = user;
        socketIO.emit('allUsers', getAllUsers());
    })
    // добавить новый чат
    socket.on('newChat', (data = { name: "New Chat", members: [] }) => {
        const chatId = newId();
        data.members.forEach(member => joinChat(member - 0, chatId));
        joinChat(sockets[socket.id], chatId);
    })
    // показать список чатов
    socket.on('allChats', () => {
        const user = socket.data.user;
        socket.emit('allChats', user.chats.map((chat, key) => {
            return {
                name: chat.name,
                members: chat.members.map(member => member.name),
                chatId: key
            }
        }))
    })
    // показать чат
    socket.on('inviteChat', (data) => {
        const user = socket.data.user;
        const newMemberSocket = sockets[data.name];
        user.chats[data.chatId].push(newMemberSocket.data.user);
        newMemberSocket.join(data.chatId);
    })
    socket.on("disconnection", (data) => {
        delete (users[sockets[socket.id]]);
        socketIO.emit('allUsers', getAllUsers());
    })
    socket.on("disconnect", (data) => {
        delete (users[sockets[socket.id]]);
        socketIO.emit('allUsers', getAllUsers());
    })
})


http.listen(PORT, () => {
    try {
        console.log("server work!");
    } catch (error) {
        console.log(error);
    }
})