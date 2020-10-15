/*
    Created: 
        Sumit Narwani   16/10/2020

 */

export { ChatHandler, chat_names };

const chat_names = [
  "Sumit Narwani",
  "Shweta Tiwari",  
  "Ananya Singh",
  "Prateek Narang",
  "Samriddhi Shrivastav",
  "Shivam Singh",
  "Shriya Chabra"
];
const chat_names_length = chat_names.length;
const chat_msg = [
  "Why didn't he come and talk to me himse...",
  "Perfect, I am really glad to hear that!...",
  "This is what I understand you're telling me..",
  "I'm sorry, I don't have the info on that..",
];

class ChatHandler {
  constructor(chat_template, chat_list) {
    this.hashmap = new Map();
    this.linked_list = null;
    this.chat_template = chat_template;
    this.chat_list = chat_list;
    let clock = new Date();
    this.hours = clock.getHours();
    this.mins = clock.getMinutes();
  }

  // Function to get the timestamp for messages
  // Format -- (HH:MM)
  getTime() {
    // Time stamp creation for messages
    this.mins += 1;
    if (this.mins === 60) {
      this.hours += 1;
      this.mins = 0;
    }

    if (this.hours === 24) {
      this.hours = 0;
    }

    return ("0" + this.hours).slice(-2) + ":" + ("0" + this.mins).slice(-2);
  }

  createNode(id) {
    // Creating node element
    let node = {};

    // Pointers to prev and next (DLL)
    node["next"] = null;
    node["prev"] = null;

    // Create a copy of chat template
    let chat_item = this.chat_template.cloneNode(true);

    // Setting name, Image, message to template item
    chat_item.querySelector("#Name").innerText =
      chat_names[id % chat_names_length];
    chat_item.querySelector("#Message").innerText =
      chat_msg[id % chat_msg_length];

    // console.log("./images/avatar" + eval(1 + (id%chat_img_length)) + ".png");
    chat_item.querySelector("#Image").src =
      ".images/avatar" + eval(1 + (id % chat_img_length)) + ".png";

    node["chat_item"] = chat_item;
    return node;
  }

  newMsg(id) {
    let node = null;
    if (id in this.hashmap === false) {
      // if node not present in the linked list
      node = this.createNode(id);
      this.hashmap[id] = node;
    } else {
      // If node present in the linked list
      node = this.getNodeFromList(id);
    }

    if (this.linked_list === null) {
      // Setting head of empty list
      this.linked_list = node;
    } else {
      // Adding node to the HEAD of linked list
      node["next"] = this.linked_list;
      if (this.linked_list !== null) {
        this.linked_list["prev"] = node;
      }

      // Updating the HEAD to point to newly added node
      this.linked_list = node;
    }
    this.updateList();
  }

  deleteMsg(id) {
    let node = this.getNodeFromList(id);

    // No use of node since it has been deleted
    // thus we cleared the entry of this id from the hashmap also
    delete this.hashmap[id];
    this.updateList();
  }

  getNodeFromList(id) {
    let node = this.hashmap[id];
    let prevNode = node["prev"];
    let nextNode = node["next"];

    // Update prev and next node pointers
    if (prevNode !== null) {
      prevNode["next"] = nextNode;
    }

    if (nextNode !== null) {
      nextNode["prev"] = prevNode;
    }

    // Update head of the linked list
    if (node === this.linked_list) {
      this.linked_list = nextNode;
    }
    node["next"] = null;
    node["prev"] = null;
    return node;
  }

  updateList() {
    // Update the contents of the chat list
    let innerHTML = "";

    // Reference for the Linked List
    let head = this.linked_list;

    // Iterator for the Linked List
    while (head !== null) {
      let element = head["chat_item"];

      // If the node is HEAD (then setting special class for different formatting)
      if (head === this.linked_list) {
        element.className = "ks-item ks-active";

        // Updating the Time
        element.querySelector("#Time").innerText = this.getTime();
      } else {
        element.className = "ks-item";
      }

      innerHTML += element.outerHTML;

      // Moving to the next node
      head = head["next"];
    }
    this.chat_list.innerHTML = innerHTML;
  }
}
