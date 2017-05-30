import React, {Component} from 'react';


class Message extends Component {
  render() {
    return (
      <div>
        <span className="message-username">Anonymous1</span>
        <span className="message-content">I wont be impressed with technology until I can download food.</span>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
    </div>
    );
  }
}
export default Message;
