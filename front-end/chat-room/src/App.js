import React, { Component } from "react";
import SockJsClient from "react-stomp";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import Clock from "./clock/Clock";

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
  }  

  connect = ()=>{   
    let socket = new SockJS('http://localhost:8080/ws-message');
    stompClient = Stomp.over(socket);
    
    stompClient.connect({user:this.state.userName}, function(frame) {
        console.log('Connected: ' + frame);

        // 廣播
        stompClient.subscribe('/topic/message', function(msgInfo) {
          this.onMessageReceived(msgInfo);
        }.bind(this));

        // 私人
        // stompClient.subscribe('/user/subscribe', function(msgInfo) {
        //   this.onMessageReceived(msgInfo).bind(this);
        // });

    }.bind(this));
  }

  disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  handleInputChange = (event)=>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onMessageReceived = (msgInfo) => {
    let response = JSON.parse(msgInfo.body);
    let messages = this.state.messages;
    messages.push(response.message);
    this.setState({ messages: messages });
  };

  sendMessage = () => {
    let msgInfo = {
      user: this.state.userName,
      message: this.state.text
    }

    stompClient.send("/app/sendMessage", {}, JSON.stringify(msgInfo));
  };

  displayMessages = () => {
    return (
      <div>
        {this.state.messages.map((msg) => {
          return (
            <div>{msg}</div>
          );
        })}
      </div>
    );
  };

  Welcome(props){
    return <h1>Hello {props.name}</h1>
  }
  

  render() {
    return (
      <div>
        <div>
          <input type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} />
          <button type="button" onClick={this.connect}>Connect</button>
          <button type="button" onClick={this.disconnect}>Disconnect</button>
        </div>
        <Clock/>
        <div className="align-center">{this.displayMessages()}</div>
        <this.Welcome name="Sara"/>
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
