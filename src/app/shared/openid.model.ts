export interface OpenIDConfigurationObject {
  authorization_endpoint: string;
  claims_parameter_supported: boolean;
  claims_supported: string[];
  code_challenge_methods_supported: string[];
  end_session_endpoint: string;
  grant_types_supported: string[];
  issuer: string;
  jwks_uri: string;
  authorization_response_iss_parameter_supported: boolean;
  response_modes_supported: string[];
  response_types_supported: string[];
  scopes_supported: string[];
  subject_types_supported: string[];
  token_endpoint_auth_methods_supported: string[];
  token_endpoint_auth_signing_alg_values_supported: string[];
  token_endpoint: string;
  id_token_signing_alg_values_supported: string[];
  pushed_authorization_request_endpoint: string;
  request_parameter_supported: boolean;
  request_uri_parameter_supported: boolean;
  userinfo_endpoint: string;
  introspection_endpoint: string;
  claim_types_supported: string[];
}

export interface OpenIDTokenResponseObject {
  access_token: string;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
}
