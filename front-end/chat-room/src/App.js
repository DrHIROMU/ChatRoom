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
      userName: "",
    };
  }

  connect = ()=>{
    console.log(this.state.text)
    // let stompClient = null;

    // let socket = new SockJS('http://localhost:8080/ws-message');
    // stompClient = Stomp.over(socket);
    
    // stompClient.connect({user:userName}, function(frame) {
    //     setConnected(true);
    //     console.log('Connected: ' + frame);

    //     // 廣播
    //     stompClient.subscribe('/topic/messages', function(messageOutput) {
    //         showMessageOutput(JSON.parse(messageOutput.body));
    //     });

    //     // 私人
    //     stompClient.subscribe('/user/subscribe', function(messageOutput) {
    //     showMessageOutput(JSON.parse(messageOutput.body));
    //     });

    // });
  }

  handleInputChange = (event)=>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
        {/* <SockJsClient
          url={SOCKET_URL}
          topics={["/topic/message"]}
          onConnect={this.onConnected}
          onDisconnect={this.onDisconnected}
          onMessage={(msg) => this.onMessageReceived(msg)}
          ref={(client) => {
            this.clientRef = client;
          }}
        /> */}
        <div>
          <input type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} />
          <button type="button" onClick={this.connect}>Connect</button>
        </div>

        <div className="align-center">{this.displayMessages()}</div>
        <div>
          <textarea
            rows="4"
            cols="50"
            name="text"
            value={this.text}
            onChange={this.handleInputChange}
          ></textarea>
          <button onClick={this.connect}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;
