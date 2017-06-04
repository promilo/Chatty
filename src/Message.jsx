import React, {Component} from 'react';


class Message extends Component {
  render() {
    console.log("Rendering Message");
    return (
      // if (this.props.type === "incoming Message") {

      // } else {
      <div>
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}.</span>

        <div className="message system">
        </div>
      </div>
      // }
    );
  }
}
export default Message;
