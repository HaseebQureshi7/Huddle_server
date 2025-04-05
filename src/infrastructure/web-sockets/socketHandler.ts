import { Server, Socket } from "socket.io";

interface Member {
  id: string;
  name: string;
}

interface Room {
  sockets: Map<string, string>; // Maps socket.id -> userId
  users: Member[]; // Array of member objects
}

const rooms: Record<string, Room> = {};

export const initializeSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", ({ roomId, userId, userName }) => {
      if (!rooms[roomId]) {
        rooms[roomId] = { sockets: new Map(), users: [] };
      }

      // Add member details if not already present
      if (!rooms[roomId].users.find((member) => member.id === userId)) {
        rooms[roomId].users.push({ id: userId, name: userName });
      }

      // Map this socket to the user
      rooms[roomId].sockets.set(socket.id, userId);
      socket.join(roomId);

      console.log(`User ${userId} (${userName}) joined room ${roomId}`);
      console.log(`Room ${roomId} has ${rooms[roomId].users.length} members`);

      // Emit updated room members with full details
      io.to(roomId).emit("room-members", { members: rooms[roomId].users });
    });

    socket.on("offer", ({ roomId, senderId, receiverId, sdp }) => {
      // Broadcast the offer to everyone in the room except sender
      socket.to(roomId).emit("offer", { senderId, sdp, receiverId });
    });

    // Updated answer event: target only the intended receiver
    socket.on("answer", ({ roomId, senderId, receiverId, sdp }) => {
      const room = rooms[roomId];
      if (!room) return;
      let targetSocketId: string | null = null;
      for (const [socketId, userId] of room.sockets.entries()) {
        if (userId === receiverId) {
          targetSocketId = socketId;
          break;
        }
      }
      if (targetSocketId) {
        io.to(targetSocketId).emit("answer", { senderId, sdp, receiverId });
      } else {
        console.warn("Receiver not found for user", receiverId);
      }
    });

    socket.on(
      "ice-candidate",
      ({ roomId, senderId, receiverId, candidate }) => {
        // Optionally, you could target the receiver similar to the answer event.
        // For now, we'll broadcast to the room:
        socket.to(roomId).emit("ice-candidate", { senderId, candidate, receiverId });
      }
    );

    // Handle mute-status events
    socket.on("mute-status", ({ roomId, userId, muted }) => {
      socket.to(roomId).emit("mute-status", { userId, muted });
    });

    // Handle video-status events
    socket.on("video-status", ({ roomId, userId, videoOn }) => {
      socket.to(roomId).emit("video-status", { userId, videoOn });
    });

    // New Canvas State Message
    socket.on("new-canvas-state", ({ roomId, canvasState }) => {
      console.log("New canvas state received for Room:", roomId);
      socket.to(roomId).emit("new-canvas-state", canvasState);
    });

    // Canvas Started Message
    socket.on("new-canvas-start", ({ roomId }) => {
      console.log("New canvas started message received for Room:", roomId);
      socket.to(roomId).emit("new-canvas-started");
    });

    // No-Canvas Mode Message
    socket.on("no-canvas-mode", ({ roomId }) => {
      console.log("No canvas mode has been started received for Room:", roomId);
      socket.to(roomId).emit("no-canvas-mode");
    });

    // When a stroke is received, broadcast it
    socket.on("canvas-stroke", ({ roomId, stroke }) => {
      socket.to(roomId).emit("canvas-stroke", { roomId, stroke });
    });

    // When canvas is cleared, broadcast it
    socket.on("canvas-clear", ({ roomId }) => {
      socket.to(roomId).emit("canvas-clear", { roomId });
    });

    socket.on("disconnect", () => {
      let removedUserId: string | undefined;
      let roomIdToUpdate: string | undefined;

      // Remove the socket from the room
      for (const roomId in rooms) {
        if (rooms[roomId].sockets.has(socket.id)) {
          removedUserId = rooms[roomId].sockets.get(socket.id)!;
          rooms[roomId].sockets.delete(socket.id);

          // Check if any socket in this room still belongs to the user
          const stillConnected = Array.from(
            rooms[roomId].sockets.values()
          ).includes(removedUserId);
          if (!stillConnected && removedUserId) {
            // Remove member details if this was the last connection
            rooms[roomId].users = rooms[roomId].users.filter(
              (member) => member.id !== removedUserId
            );
          }

          roomIdToUpdate = roomId;
          break;
        }
      }

      if (roomIdToUpdate) {
        io.to(roomIdToUpdate).emit("room-members", {
          members: rooms[roomIdToUpdate].users,
        });
      }

      console.log("Client disconnected:", socket.id);
    });
  });
};
