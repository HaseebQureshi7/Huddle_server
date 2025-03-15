import { UpdateUserDTO } from "../../dtos/user/UpdateUser.dto";
import { UserEntity } from "../../../domain/entities/User.entity";
import { UserRepository } from "../../../domain/repositories/User.repo";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(updatedData: UpdateUserDTO): Promise<UserEntity> {
    return this.userRepository.update(updatedData);
  }
}
