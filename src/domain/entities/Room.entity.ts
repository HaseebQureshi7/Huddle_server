import { User as IUser } from "@prisma/client";

export class UserEntity implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.avatarUrl = user.avatarUrl;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

import { Room as IRoom } from "@prisma/client";

export class RoomEntity implements IRoom {
  id: string;
  name: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(room: IRoom) {
    this.id = room.id;
    this.name = room.name;
    this.isPublic = room.isPublic;
    this.createdAt = room.createdAt;
    this.updatedAt = room.updatedAt;
  }
}