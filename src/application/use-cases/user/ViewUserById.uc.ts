import { UserEntity } from "../../../domain/entities/User.entity";
import { UserRepository } from "../../../domain/repositories/User.repo";

export class ViewUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(uid: string): Promise<UserEntity | null> {
    return this.userRepository.viewById(uid);
  }
}
