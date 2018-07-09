import {MESSAGES,LOADING,USERNAME,TYPING} from './types'

export function addMessage(message){
  return ({type:MESSAGES,data:message})
}

export function setLoader(bool){
  return ({type:LOADING,data:bool})
}

export function setUsername(name){
  return ({type:USERNAME,data:name})
}

export function isTyping(username){
  return ({type:TYPING,data:username})
}
