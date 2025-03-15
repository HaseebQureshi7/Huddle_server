import { Request, Response } from "express";
import { CreateUserDTO } from "../../../application/dtos/auth/CreateUser.dto";
import { LoginDTO } from "../../../application/dtos/auth/Login.dto";
import { EmailAddress } from "../../../domain/value-objects/EmailAddress.vo";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";
import { LoginUseCase } from "../../../application/use-cases/auth/Login.uc";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { CreateUserUseCase } from "../../../application/use-cases/auth/CreateUser.uc";
import { catchAsync } from "../../../shared/utils/CatchAsync";

export class AuthController {
  private loginUseCase: LoginUseCase;
  private registerUseCase: CreateUserUseCase;

  constructor(authRepo: AuthRepository) {
    this.loginUseCase = new LoginUseCase(authRepo);
    this.registerUseCase = new CreateUserUseCase(authRepo);
  }

  register = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const signupDTO = new CreateUserDTO({
      name,
      email: new EmailAddress(email),
      password,
    });

    const user = await this.registerUseCase.execute(signupDTO);
    ResponseHandler.success(res, "User registered successfully", 201, { user });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginDTO = new LoginDTO({
      email: new EmailAddress(email),
      password,
    });

    const result = await this.loginUseCase.execute(loginDTO);
    ResponseHandler.success(res, "Login successful", 200, result);
  });
}
