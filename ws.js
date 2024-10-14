const WebSocket = require("ws");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const wss = new WebSocket.Server({ server });

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);

  // Broadcast online status to all clients
  broadcastOnlineStatus();

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case "chat":
        handleMessage(ws, data);
        break;
      case "join":
        handleJoin(ws, data);
        break;
      case "leave":
        handleLeave(ws, data);
        break;
      case "typing":
        handleTyping(ws, data);
        break;
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    broadcastOnlineStatus();
  });
});

function handleMessage(sender, data) {
  if (data.to) {
    // One-to-One Chat
    const recipient = Array.from(clients).find((client) => client.username === data.to);
    if (recipient) {
      recipient.send(
        JSON.stringify({ type: "chat", from: sender.username, message: data.message })
      );
    }
  } else if (data.room) {
    // Group Chat
    broadcastToRoom(sender, data.room, {
      type: "chat",
      from: sender.username,
      message: data.message,
    });
  } else {
    // Broadcast
    broadcast({ type: "chat", from: sender.username, message: data.message });
  }
}

function handleJoin(client, data) {
  client.username = data.username;
  broadcastOnlineStatus();
}

function handleLeave(client, data) {
  delete client.username;
  broadcastOnlineStatus();
}

function handleTyping(client, data) {
  if (data.room) {
    broadcastToRoom(client, data.room, { type: "typing", from: client.username });
  }
}

function broadcastOnlineStatus() {
  const onlineUsers = Array.from(clients)
    .filter((client) => client.username)
    .map((client) => client.username);
  broadcast({ type: "onlineStatus", users: onlineUsers });
}

function broadcast(message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function broadcastToRoom(sender, room, message) {
  clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      client.username &&
      client.username !== sender.username
    ) {
      if (client.rooms && client.rooms.includes(room)) {
        client.send(JSON.stringify(message));
      }
    }
  });
}

// Server starts listening on port 3000
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
