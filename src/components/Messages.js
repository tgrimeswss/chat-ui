import React,{Component} from 'react'
import ReactHtmlParser from 'react-html-parser'
import {connect} from 'react-redux'
import {Popup,Loader,Card,Feed,Divider} from 'semantic-ui-react'


class Messages extends Component {
  render(){
    const {messages,loading,typing,username} = this.props //Destructuring

    /* Semantic UI is heavily used to render clean mapped messages. When a user
    hovers the particular message, the messages timestamp will appear indicating
    when the message was actually sent. If there is an interuption in the socket
    connection upon sending a new message, a loading module will appear. */
    return (
      <div>
        <Card style={{width:'100%'}}>
          <Card.Content>
            <Card.Header>Content</Card.Header>
          </Card.Content>
        {messages.map((message,i)=>(
          <div className="textLeft" key={i}>
            <Popup
              trigger={
                //Below will change the color of the background dependinf on if the username is the one entered by user at the start of the application
                  <Card.Content style={{backgroundColor:(message.username===username)?'#89b4f9':'white'}}>
                    <Feed>
                      <Feed.Event>
                        <Feed.Label image={message.avatar||require('../assets/unknown-avatar.png')}/>
                        <Feed.Content>
                          <Feed.Date content={message.username} />
                          <Feed.Summary>{ReactHtmlParser(message.text)}</Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                    <Divider/>
                  </Card.Content>
              }
              content={`Sent at ${new Date(message.timeStamp)}`} />
          </div>
        ))}
        {(typing)?(<div>{typing} is typing...</div>):(null)}
        <div className="textCenter">
          {(loading)?(<Loader size="large" active inline/>):(null)}
        </div>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(initialState){
  return {
    messages: initialState.messages,
    loading: initialState.loading,
    typing: initialState.typing,
    username: initialState.username
  }
}

export default connect(mapStateToProps)(Messages)
