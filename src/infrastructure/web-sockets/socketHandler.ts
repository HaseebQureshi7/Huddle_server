import { Server, Socket } from "socket.io";

const rooms: Record<string, { sockets: Map<string, string>; users: Set<string> }> = {}; 

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", ({ roomId, userId }) => {
      if (!rooms[roomId]) {
        rooms[roomId] = { sockets: new Map(), users: new Set() };
      }

      if (!rooms[roomId].users.has(userId)) {
        rooms[roomId].users.add(userId);
      }

      rooms[roomId].sockets.set(socket.id, userId);
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
      console.log(`Room ${roomId} has ${rooms[roomId].users.size} members`);

      io.to(roomId).emit("room-members", { members: Array.from(rooms[roomId].users) });
    });

    socket.on("disconnect", () => {
      let removedUserId: string | undefined;
      let roomIdToUpdate: string | undefined;

      for (const roomId in rooms) {
        if (rooms[roomId].sockets.has(socket.id)) {
          removedUserId = rooms[roomId].sockets.get(socket.id);
          rooms[roomId].sockets.delete(socket.id);

          const stillConnected = Array.from(rooms[roomId].sockets.values()).includes(removedUserId!);
          if (!stillConnected && removedUserId) {
            rooms[roomId].users.delete(removedUserId);
          }

          roomIdToUpdate = roomId;
          break;
        }
      }

      if (roomIdToUpdate) {
        io.to(roomIdToUpdate).emit("room-members", {
          members: Array.from(rooms[roomIdToUpdate].users),
        });
      }

      console.log("Client disconnected:", socket.id);
    });
  });
};
