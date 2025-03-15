import { CreateUserDTO } from "../../dtos/auth/CreateUser.dto";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { AppError } from "../../../shared/utils/AppError";
import { SafeUser } from "../../../domain/interfaces/ISafeUser.type";

export class CreateUserUseCase {
  constructor(private userRepository: AuthRepository) {}

  async execute(userData: CreateUserDTO): Promise<SafeUser> {
    const { name, email, password } = userData;

    // Check if required fields are provided
    if (!name || !email || !password) {
      throw new AppError("Name, email, and password are required.", 406);
    }

    // Ensure password meets minimum security requirements
    if (password.length < 6) {
      throw new AppError("Password must be at least 6 characters long.", 406);
    }

    // Check if email is already registered
    const existingUser = await this.userRepository.findUserByEmail(email.value);
    if (existingUser) {
      throw new AppError("Email is already in use.", 403);
    }

    // Proceed with user creation
    return this.userRepository.create(userData);
  }
}
