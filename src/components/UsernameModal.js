import React,{Component} from 'react'
import {Button,Input} from 'semantic-ui-react'
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import {setUsername} from '../actions'


class UsernameModal extends Component {
  constructor(props, context) {
    super(props, context)
    this.state={input:''}
  }


  setUsername=()=>{
    const {createdName} = this.state
    const {setUsername} = this.props
    setUsername(createdName)
    this.setState({createdName:'',modalOpen:false})
  }

  render(){
    const {username} = this.props
    return (
      <Modal show={!username} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>Enter a username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input onChange={(e)=>this.setState({createdName:e.target.value})}/>
          <Button size="huge" onClick={this.setUsername}>Enter</Button>
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(initialState){
  return {
    username: initialState.username
  }
}


export default connect(mapStateToProps,{setUsername})(UsernameModal)

// {(username)?(<div>{username}</div>):(<Input onBlur={this.setUsername} placeholder='Enter your username...' onChange={(e)=>this.setState({createdName:e.target.value})}/>)}
