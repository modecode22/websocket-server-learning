const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let connectedClients = [];
let messages = [];

wss.on("connection", (ws) => {
  // Add the new client to the connectedClients array
  connectedClients.push(ws);

  // Send the list of messages to the newly connected client
  ws.send(JSON.stringify(messages));

  ws.on("message", (message) => {
    // Convert the incoming message to a string
    const incomingMessage = message.toString();

    // Process the incoming message here
    const response = incomingMessage.includes("right")
      ? "That's right!"
      : "That's wrong!";

    // Create a response object with the original message and the result
    const responseObject = {
      message: incomingMessage,
      result: response,
    };

    // Add the new message to the list of messages
    messages.push(responseObject);

    // Broadcast the list of messages to all connected clients
    const messageJSON = JSON.stringify(messages);
    connectedClients.forEach((client) => {
      client.send(messageJSON);
    });
  });

  ws.on("close", () => {
    // Remove the disconnected client from the connectedClients array
    connectedClients = connectedClients.filter((client) => client !== ws);
  });
});

// Function to get the number of connected clients
function getConnectedClientsCount() {
  return connectedClients.length;
}
