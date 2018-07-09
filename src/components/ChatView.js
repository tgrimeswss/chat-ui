import React,{Component} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import {Button} from 'semantic-ui-react'
import UsernameModal from './UsernameModal'
import io from "socket.io-client"
import Messages from './Messages'
import UserHistory from './UserHistory'
import {connect} from 'react-redux'
import {addMessage,setLoader,setUsername,isTyping} from '../actions'
import {Row,Col,Navbar,FormGroup} from 'react-bootstrap'

const socket = io("https://spotim-demo-chat-server.herokuapp.com")

class ChatBox extends Component {
/*
A constructor is created upon initiation of the component.
It contains in house state only to be used by the Chatbox component. All other
state is stored globally by a redux store (username)
vvvvvvvvvvvvvvvvvvvvv
*/
  constructor(props){
    super(props)

    //This is a hacky broadcasting socket not to be incorporated on the frontend
    //but does add some cool added functionality. When the user is typing a message,
    //a message box will be displayed stating what username is currently typing.
    //When the username does not have anything in their 'inputBox', the message will
    //return null, producing nothing on the screen.
    socket.on('spotim/chat',(data)=>{
      if(data.characters>1&&data.username!==this.props.username){
        this.props.isTyping(data.username)
      } else if(data.characters===1&&data.username!==this.props.username){
        this.props.isTyping(null)
      } else if(data.timeStamp) {
        this.props.addMessage(data)
        this.props.setLoader(false)
      }
    })
    this.state = {input:''}
    this.sendMessage = this.sendMessage.bind(this)
    this.reactQuillRef = null
    this.quillRef = null
  }


/*
The action below will emit a message object to the open socket containing the
current date/time of the message sent as well as the username and body of the message
sent. It will also clear the state of the current message typed.
*/
  sendMessage=()=>{
    const {input} = this.state
    const {setLoader,username,isTyping} = this.props
    if(input){
      socket.emit('spotim/chat',{timeStamp:Date.now(),avatar:'',username:username,text:input})
      this.setState({input:''})
      isTyping(null)
      setLoader(true)

    } else {console.error('You must first enter some input in the box provided')}
  }

  broadcastMessage=(data)=>{
    const editor = this.textBox.getEditor()
    const unprivilegedEditor = this.textBox.makeUnprivilegedEditor(editor)
    this.setState({input:data})
    socket.emit('spotim/chat',{characters:unprivilegedEditor.getLength(),username:this.props.username})
  }

  render(){
    const {input} = this.state  //Destructuring
    const {username} = this.props  //Destructuring
    /*This component utilizes the bootstrap philosophy of columns and rows to render
    a dynamic layout to the viewport. It includes all the elements of the chat.
    Some components as you can see are separated and nested to make use of React's
    component based architecture render what is needed when comparing virtual
    nodes against the real DOM.
    */
    return (
      <div className="chatView">
        <UsernameModal/>
        <Row>
          <Col className="contentBoxes" xs={3}><UserHistory/></Col>
          <Col className="contentBoxes" xs={9}><Messages/></Col>
        </Row>
            <Navbar fixedBottom>
              <Navbar.Header>
                <Navbar.Brand>
                  {username}
                </Navbar.Brand>
              </Navbar.Header>
              <Navbar.Collapse>
                <Navbar.Form pullLeft>
                  <FormGroup>
                    <ReactQuill
                      ref={(input)=>{this.textBox = input}}
                      style={{width:500}}
                      className="textBox border"
                      theme="bubble"
                      onChange={(data)=>this.broadcastMessage(data)}
                      value={input}/>
                  </FormGroup>
                  <Button onClick={this.sendMessage} size="massive" type="submit">Submit</Button>
                </Navbar.Form>
              </Navbar.Collapse>
            </Navbar>
      </div>
    )
  }
}

function mapStateToProps(initialState){
  return {
    username: initialState.username
  }
}


export default connect(mapStateToProps,{addMessage,setLoader,setUsername,isTyping})(ChatBox)
