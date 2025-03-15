import { EmailAddress } from "../../../../domain/value-objects/EmailAddress.vo";

export interface CreateUserDTOProps {
  name: string;
  email: EmailAddress;
  password: string;
}
