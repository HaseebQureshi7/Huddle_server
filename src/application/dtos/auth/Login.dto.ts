import { EmailAddress } from "../../../domain/value-objects/EmailAddress.vo";
import { LoginDTOProps } from "./interfaces/ILogin.type";

export class LoginDTO {
  public email: EmailAddress;
  public password: string;

  constructor(loginData: LoginDTOProps) {
    this.email = loginData.email;
    this.password = loginData.password;
  }
}
