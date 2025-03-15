import { LoginDTO } from "../../application/dtos/auth/Login.dto";
import { CreateUserDTO } from "../../application/dtos/auth/CreateUser.dto";
import { UserEntity } from "../entities/User.entity";
import { SafeUser } from "../interfaces/ISafeUser.type";

export interface AuthRepository {
  login(user: LoginDTO): Promise<SafeUser | null>;
  create(user: CreateUserDTO): Promise<SafeUser>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
}
