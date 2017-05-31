import React, {Component} from 'react';


const defaultState = {
  username: '',
  content: ''
}


class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {username: "", content: ""};
  }


  render() {
    console.log("Rendering ChatBar");
    let currentUser = this.props.user // Getting the username from the currentUser from app.jsx
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder={currentUser} value={currentUser} onChange = {this._usernameChange}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange = {this._contentChange} onKeyPress={this._onEnter}/>
        </footer>

      </div>
    );
  }
  _usernameChange = (e) => {
    console.log("usernamefunction is called")
    this.setState({username: e.target.value})
  }

  _contentChange = (e) => {
    console.log("usernamefunction is called")
    this.setState({content: e.target.value})
  }

  _onEnter = (e) => {
     if (e.key === 'Enter') {
       console.log("Entered was pressed.")
       this.props.enterMessage(this.state);
     }
  }





}
export default ChatBar;
