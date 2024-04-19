"use server";

const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { version, validate } = require("uuid");
const pool = require("./pool");
const ACTIONS = require("./src/socket/actions");
const { uuid } = require("uuidv4");
const { sendMessage } = require("./src/server/actions/call/sendMessage");

const PORT = 3001;

function getClientRooms() {
  const { rooms } = io.sockets.adapter;

  return Array.from(rooms.keys()).filter(
    (roomID) => validate(roomID) && version(roomID) === 4
  );
}

function shareRoomsInfo() {
  io.emit(ACTIONS.SHARE_ROOMS, {
    rooms: getClientRooms(),
  });
}

io.on("connection", (socket) => {
  shareRoomsInfo();

  socket.on("send", async (data) => {
    console.log("send", data);

    const clients = Array.from(io.sockets.adapter.rooms.get(data.roomID) || []);

    clients.map((i) => {
      io.to(i).emit("eventSend", {
        text: data.message + "^^" + data.userId + "^^" + new Date(),
        type: data.testId ? "test" : "text",
        testId: data.testId,
      });
    });

    // const post = await pool.query(
    //   `INSERT INTO public."Message"(id, text, type, "meetingId", "testId") values($1,$2,$3,$4,$5)`,
    //   [
    //     uuid(),
    //     "test",
    //     "test",
    //     "15c71fd7-2a64-43bf-a1d2-7ea4be33ccc6",
    //     "clrxsd0bg0015vi7ob6ofc7tz",
    //   ]
    // );
    if (data.testId)
      sendMessage({
        meetingId: data.roomID,
        text: data.message,
        userId: data.userId,
        testId: data.testId,
      });
    else
      sendMessage({
        meetingId: data.roomID,
        text: data.message,
        userId: data.userId,
      });
  });

  socket.on(ACTIONS.JOIN, (config) => {
    const { room: roomID } = config;
    const { rooms: joinedRooms } = socket;

    if (Array.from(joinedRooms).includes(roomID)) {
      return console.warn(`Already joined to ${roomID}`);
    }

    const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

    console.log(clients, clients);

    clients.forEach((clientID) => {
      io.to(clientID).emit(ACTIONS.ADD_PEER, {
        peerID: socket.id,
        createOffer: false,
      });

      socket.emit(ACTIONS.ADD_PEER, {
        peerID: clientID,
        createOffer: true,
      });
    });

    socket.join(roomID);
    shareRoomsInfo();
  });

  function leaveRoom() {
    const { rooms } = socket;

    Array.from(rooms)
      // LEAVE ONLY CLIENT CREATED ROOM
      .filter((roomID) => validate(roomID) && version(roomID) === 4)
      .forEach((roomID) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        clients.forEach((clientID) => {
          io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
            peerID: socket.id,
          });

          socket.emit(ACTIONS.REMOVE_PEER, {
            peerID: clientID,
          });
        });

        socket.leave(roomID);
      });

    shareRoomsInfo();
  }

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on("disconnecting", leaveRoom);

  socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
    io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerID: socket.id,
      sessionDescription,
    });
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
    io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
      peerID: socket.id,
      iceCandidate,
    });
  });
});

const publicPath = path.join(__dirname, "build");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(PORT, () => {
  console.log("Server Started!");
});
