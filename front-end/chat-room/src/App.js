import React, { Component } from "react";
import SockJsClient from "react-stomp";

const SOCKET_URL = "http://localhost:8080/ws-message";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: "Hello World",
      typedMessage: "",
      name: "",
    };
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onConnected = () => {
    console.log("Connected!!");
  };

  onDisconnected = () => {
    console.log("Disconnected!!");
  };

  onMessageReceived = (msgInfo) => {
    let messages = this.state.messages;
    messages.push(msgInfo.message);
    this.setState({ messages: messages });
  };

  sendMessage = () => {
    this.clientRef.sendMessage(
      "/app/sendMessage",
      JSON.stringify({
        message: this.state.text,
      })
    );
  };

  displayMessages = () => {
    return (
      <div>
        {this.state.messages.map((msg) => {
          return (
            <div>
              <p>{msg}</p>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <SockJsClient
          url={SOCKET_URL}
          topics={["/topic/message"]}
          onConnect={this.onConnected}
          onDisconnect={this.onDisconnected}
          onMessage={(msg) => this.onMessageReceived(msg)}
          ref={(client) => {
            this.clientRef = client;
          }}
        />

        <div className="align-center">{this.displayMessages()}</div>
        <div>
          <textarea
            rows="4"
            cols="50"
            value={this.text}
            onChange={this.handleChange}
          ></textarea>
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;
