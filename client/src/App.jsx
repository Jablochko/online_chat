import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import socketIO from "socket.io-client";
import ChatPage from "./components/Chat/ChatPage";
import HomePage from "./components/Home/HomePage";

const socket = socketIO.connect("http://localhost:3001");

function App() {

  const [userData, setUserData] = useState(null);
  
  return (
    <Routes>
      <Route path="/" element={<HomePage socket={socket} setUserData={setUserData}/>} />
      <Route path="/chat" element={
        <ChatPage 
          socket={socket} 
          user={userData} 
          setUserData={setUserData}
        />} />
    </Routes>
  )
}

export default App;
