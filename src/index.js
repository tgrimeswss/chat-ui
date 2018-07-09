import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import reducer from './reducers/index'
import App from "./components";
import io from "socket.io-client";
import {Provider} from 'react-redux'
import {createStore} from 'redux'

export const store = createStore(reducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));


//connecting to Socket.IO chat server
const socket = io("https://spotim-demo-chat-server.herokuapp.com");
socket.on("connect", function() {
  console.log("connected to chat server!");
});
socket.on("disconnect", function() {
  console.log("disconnected from chat server!");
});
