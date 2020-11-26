import React from "react";
import InputBox from "./ChatRoom/InputBox";
import Messages from "./Message/Messages";
import "../css/InputBox.css";
import "../css/MainApp.css";

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      date: new Date().toLocaleString(),
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message) {
    const messages = this.state.messages;
    const messageObj = {
      username: this.props.username,
      message: message,
    };
    messageObj.fromThisUser = true;

    messages.push(messageObj);
    this.setState({ messages: messages });
  }

  render() {
    return (
      <div className="chat-container">
        <div className="room-name">{this.props.username}</div>
        <hr />
        <div>
          <Messages
            className="message-container"
            messages={this.state.messages}
            username={this.props.username}
          />
        </div>
        <div>
          <InputBox className="user-input" sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}
