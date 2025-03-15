import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { AppError } from "../../../shared/utils/AppError";
import { LoginDTO } from "../../dtos/auth/Login.dto";

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(loginData: LoginDTO) {
    // Check if email and password are provided
    if (!loginData?.email || !loginData?.password) {
      throw new AppError("Email and password are required.", 400);
    }

    // Call the repository for authentication
    const user = await this.authRepository.login(loginData);

    if (!user) {
      throw new AppError("Invalid email or password.", 401);
    }

    return user;
  }
}
