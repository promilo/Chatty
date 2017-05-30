import React, {Component} from 'react';





class ChatBar extends Component {
  render() {
    console.log("Rendering ChatBar");
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder={this.props.user} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>


      </div>
    );
  }
}
export default ChatBar;
