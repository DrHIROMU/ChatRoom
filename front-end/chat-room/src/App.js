import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import axios from "axios"

const SOCKET_URL = 'http://localhost:8080/ws-message';

const App = () => {
  const [message, setMessage] = useState('You server message here.');

  const [text, setValue] = useState('Hello World');
  const handleChange = (e) => setValue(e.target.value);

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onDisconnected = () => {
    console.log("Disconnected!!")
  }

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
  }

  function sendMessage(){
    axios.post('http://localhost:8080/sendMessage', {
      message:text
    })
    .then(res =>{
      console.log(res)
    })
  }

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={onDisconnected}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
      <div>
        <textarea rows="4" cols="50" value={text} onChange={handleChange}></textarea>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>    
  );
}

export default App;