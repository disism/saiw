export interface OidcProviderObject {
  name: string;
  configuration_endpoint: string;
}

export interface NodeInfoObject {
  oidc_provider_supported: OidcProviderObject[];
  saikan: string;
}
