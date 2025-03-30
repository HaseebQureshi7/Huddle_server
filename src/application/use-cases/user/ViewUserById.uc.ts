import { UserEntity } from "../../../domain/entities/User.entity";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { UserRepository } from "../../../domain/repositories/User.repo";
import { AppError } from "../../../shared/utils/AppError";

export class ViewUserByIdUseCase {
  constructor(private userRepository: AuthRepository) {}

  async execute(uid: string): Promise<UserEntity | null> {
    if (!uid) {
      throw new AppError("No uid provided!", 400);
    }
    const userFound = await this.userRepository.findUserById(uid);
    if (!userFound) {
      throw new AppError("No user found with this id", 404);
    }

    return userFound;
  }
}
