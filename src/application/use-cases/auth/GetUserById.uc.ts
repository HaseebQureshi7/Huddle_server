import { UserEntity } from "../../../domain/entities/User.entity";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";

export class GetUserByIdUseCase {
  constructor(private userRepository: AuthRepository) {}

  async execute(uid: string): Promise<UserEntity | null> {
    return this.userRepository.findUserById(uid);
  }
}
