import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Image,List,Card,Divider} from 'semantic-ui-react'

class UserHistory extends Component {

  render(){
    const {messages} = this.props  //Destructuring
    const uniquenames = messages.filter((message,i,self)=>{
      return self.map(mapObj => mapObj['username']).indexOf(message['username']) === i
    })

    /* This is just some extra stuff I decided to incorporate into the app. It provides
    a filtered list of users that have contributed to the chat forum. Logic for the filtered
    list is above utilizing the new filter and map features of Javascript.
    A default avatar image is also incorporated to display an 'unknown' profile image.*/
    return (
      <Card className="fullWidth">
        <Card.Content>
          <Card.Header>User history</Card.Header>
        </Card.Content>
          {uniquenames.map((message,i)=>(
            <div key={i}>
              <List.Item>
                <Image avatar src={message.avatar||require('../assets/unknown-avatar.png')} />
                <List.Content>
                  <List.Header>{message.username}</List.Header>
                </List.Content>
              </List.Item>
              <Divider/>
            </div>
          ))}
      </Card>
    )
  }
}
//The message reducer displays all the pushed messages from a once empty array 
function mapStateToProps(initialState){
  return {
    messages: initialState.messages
  }
}

export default connect(mapStateToProps)(UserHistory)
