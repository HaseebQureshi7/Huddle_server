import { UserEntity } from "../entities/User.entity";

export interface SafeUser extends Omit<UserEntity, "password"> {}
