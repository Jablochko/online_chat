import { Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client";
import ChatPage from "./components/Chat/ChatPage";
import HomePage from "./components/Home/HomePage";
const socket = socketIO.connect("http://localhost:3001")

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage socket={socket} />} />
      <Route path="/chat" element={<ChatPage socket={socket} />} />
    </Routes>
  )
}

export default App
