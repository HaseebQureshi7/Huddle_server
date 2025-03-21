import { Request, Response } from "express";
import { CreateUserDTO } from "../../../application/dtos/auth/CreateUser.dto";
import { LoginDTO } from "../../../application/dtos/auth/Login.dto";
import { EmailAddress } from "../../../domain/value-objects/EmailAddress.vo";
import { ResponseHandler } from "../../../shared/utils/ResponseHandler";
import { LoginUseCase } from "../../../application/use-cases/auth/Login.uc";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { CreateUserUseCase } from "../../../application/use-cases/auth/CreateUser.uc";
import { catchAsync } from "../../../shared/utils/CatchAsync";
import { RefreshTokenUseCase } from "../../../application/use-cases/user/RefreshToken.uc";
import { cookieOptions } from "../../../infrastructure/config/cookieOptions.config";

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

    const loginDetails = new LoginDTO({
      email: new EmailAddress(email),
      password,
    });

    const { accessToken, refreshToken } = await this.loginUseCase.execute(loginDetails);

    // Set the refresh token in cookies
    res.cookie("accessTokens", accessToken, cookieOptions);
    res.cookie("refreshTokens", refreshToken, cookieOptions);

    ResponseHandler.success(res, "User registered successfully", 201, { user, accessToken, refreshToken });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginDTO = new LoginDTO({
      email: new EmailAddress(email),
      password,
    });

    const {accessToken, refreshToken} = await this.loginUseCase.execute(loginDTO);

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    ResponseHandler.success(res, "Login successful", 200, {accessToken});
  });
  
  refreshToken = catchAsync(async (req: Request, res: Response) => {
    const refreshTokenUseCase = new RefreshTokenUseCase();
    const oldRefreshToken = req.cookies.refreshToken;


    const {accessToken, refreshToken} = await refreshTokenUseCase.execute(oldRefreshToken);

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    ResponseHandler.success(res, "Tokens successfully refreshed", 200, {accessToken: accessToken, refreshToken: refreshToken});
  })
}
