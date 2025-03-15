import { EmailAddress } from "../../../../domain/value-objects/EmailAddress.vo";

export interface LoginDTOProps {
  email: EmailAddress;
  password: string;
}
