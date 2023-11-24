import {OpenIDConfigurationObject} from "./openid.model";

export interface AuthSessionObject {
  challenge_verifier: string;
  provider: OpenIDConfigurationObject;
}

export interface AuthNResponseObject {
  access_token: string;
  code: number;
}
