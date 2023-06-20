import React, { useState, useEffect, useRef, Component } from "react";
import SockJsClient from "react-stomp";
import NameComponent from "./components/NameComponent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./css/MessageStyle.css";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function App() {
  const WEBSOCKET_URL = "http://localhost:8081/websocket-chat";

  const [name, setName] = useState("");
  const [typedMessage, setTypedMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketClient, setClient] = useState([]);
  const currentMsgs = useRef([]);

  let sendMessage = () => {
    socketClient.send(
      "/app/user/2",
      {},
      JSON.stringify({
        name: name,
        message: typedMessage,
      })
    );
  };

  // useEffect(() => {
  //   let sock = new SockJS(WEBSOCKET_URL);
  //   let client = Stomp.over(sock);
  //   setClient(client);

  //   client.connect({}, function () {
  //     client.subscribe("/topic/user/2", (response) => {
  //       let responseBody = JSON.parse(response.body);
  //       let newMessages = currentMsgs.current.slice();
  //       newMessages.push(responseBody);
  //       currentMsgs.current = newMessages;
  //       setMessages(newMessages);
  //     });
  //   });
  // }, []);

  let connect = () => {
    let sock = new SockJS(WEBSOCKET_URL);
    let client = Stomp.over(sock);
    setClient(client);

    client.connect({}, function () {
      client.subscribe("/topic/user/2", (response) => {
        let responseBody = JSON.parse(response.body);
        let newMessages = currentMsgs.current.slice();
        newMessages.push(responseBody);
        currentMsgs.current = newMessages;
        setMessages(newMessages);
      });
    });
  };

  /* <SockJsClient
        url={WEBSOCKET_URL}
        topics={["/topic/user"]}
        onConnect={() => {
          console.log("connected");
        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}
        onMessage={(msg) => {
          let newMessages = messages.slice();
          newMessages.push(msg);
          setMessages(newMessages);
        }}
        ref={(client) => {
          clientRef = client;
        }}
      /> */

  let displayMessages = () => {
    return (
      <div>
        {messages.map((msg) => {
          return (
            <div>
              {name == msg.name ? (
                <div>
                  <p className="title1">{msg.name} : </p>
                  <br />
                  <p>{msg.message}</p>
                </div>
              ) : (
                <div>
                  <p className="title2">{msg.name} : </p>
                  <br />
                  <p>{msg.message}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <NameComponent setName={setName} />
      <div className="align-center">
        <h1>Welcome to Web Sockets</h1>
      </div>
      <div className="align-center">
        User : <p className="title1"> {name}</p>
      </div>
      <div className="align-center">
        <table>
          <tr>
            <td>
              <TextField
                id="outlined-basic"
                label="Enter Message to Send"
                variant="outlined"
                onChange={(event) => {
                  setTypedMessage(event.target.value);
                }}
              />
            </td>
            <td>
              <Button variant="contained" color="primary" onClick={sendMessage}>
                Send
              </Button>
            </td>
          </tr>
        </table>
      </div>
      <div className="align-center">{displayMessages()}</div>
    </>
  );
}

export default App;
