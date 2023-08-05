const ws = new WebSocket("ws://localhost:8080");

// Array to store messages
let messages = [];

ws.onmessage = (event) => {
  const responseElement = document.getElementById("response");
  const responseObject = JSON.parse(event.data);

  // Add the new message to the messages array
  messages.push(responseObject);

  // Update the display with all messages
  responseElement.textContent 
};

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;
  ws.send(message);
  messageInput.value = "";
}
