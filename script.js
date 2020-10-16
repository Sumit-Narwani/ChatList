import { ChatHandler, chat_names } from "./test.js";

onload = function () {

  // Getting reference to all the HTML elements
  const chatlist = document.getElementById("chat-list");
  const add = document.getElementById("generate-step");
  const text = document.getElementById("temptext");

  const templates = document.getElementsByTagName("template")[0];
  const chat_item = templates.content.querySelector("li");

  // Initializing chatHandler
  const chatHandler = new ChatHandler(chat_item, chatlist);
  
  // Created a chats array to store id's of the users
  let chats = [];

  add.onclick = function () {

    // DELETING a message
    // When R>0.75 && chat list is not empty
    if (Math.random() > 0.75 && chats.length > 0) {
      let index = Math.floor(Math.random() * chats.length);

      // Getting id from the chats using random index
      let idToDelete = chats[index];
      chatHandler.deleteMsg(idToDelete);
      text.innerHTML =
        "Deleted message from " +
        chat_names[idToDelete] +
        "<br>" +
        text.innerHTML;

        // Removing the chat from the chatlist
      chats.splice(index, 1);
    } 
    
    // When we have to INSERT a new message
    else {
      let idOfMsg = Math.floor(Math.random() * 7);

      // if the id is not present then we push
      if (chats.includes(idOfMsg) === false) {
        chats.push(idOfMsg);    
      }
      chatHandler.newMsg(idOfMsg);
      text.innerHTML =
        "New message from " + chat_names[idOfMsg] + "<br>" + text.innerHTML;
    }
  };
};
