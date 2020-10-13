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


  
}
