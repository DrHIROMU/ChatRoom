import React, { Component } from "react";
import SockJsClient from "react-stomp";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'

const SOCKET_URL = "http://localhost:8080/ws-message";

let stompClient = null;

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      text: "Hello World",
      typedMessage: "",
      userName: "",
    };    
    this.test();
  }  

  test(params) {
    console.log(this.state.text)
  }

  connect = ()=>{   
    let socket = new SockJS('http://localhost:8080/ws-message');
    stompClient = Stomp.over(socket);
    
    stompClient.connect({user:this.state.userName}, function(frame) {
        // setConnected(true);
        console.log('Connected: ' + frame);

        // 廣播
        stompClient.subscribe('/topic/message', function(msgInfo) {
          console.log(msgInfo);
          this.onMessageReceived(msgInfo);
        }
        );

        // 私人
        // stompClient.subscribe('/user/subscribe', function(msgInfo) {
        //   this.onMessageReceived(msgInfo).bind(this);
        // });

    });
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
    console.log(msgInfo)
    let messages = this.state.messages;
    messages.push(msgInfo.message);
    this.setState({ messages: messages });
  };

  sendMessage = () => {
    let msgInfo = {
      message : this.state.text
    }

    stompClient.send("/app/sendMessage", {}, JSON.stringify(msgInfo));
    // this.clientRef.sendMessage(
    //   "/app/sendMessage",
    //   JSON.stringify({
    //     message: this.state.text,
    //   })
    // );
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
          <button type="button" onClick={this.connect.bind(this)}>Connect</button>
        </div>

        <div className="align-center">{this.displayMessages()}</div>
        <div>
          <textarea
            rows="4"
            cols="50"
            name="text"
            value={this.state.text}
            onChange={this.handleInputChange}
          ></textarea>
          <button onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;
