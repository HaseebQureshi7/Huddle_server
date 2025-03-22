import { UserEntity } from "../../../domain/entities/User.entity";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";

export class GetUserByEmailUseCase {
  constructor(private userRepository: AuthRepository) {}

  async execute(email: string): Promise<UserEntity | null> {
    return this.userRepository.findUserByEmail(email);
  }
}
