import { UpdateUserDTO } from "../../application/dtos/user/UpdateUser.dto";
import { UserEntity } from "../entities/User.entity";

export interface UserRepository {
  // CRUD
  findById(uid: string): Promise<UserEntity | null>;
  update(updated_data: UpdateUserDTO): Promise<UserEntity>;
  delete(uid: string): Promise<UserEntity>;
}
