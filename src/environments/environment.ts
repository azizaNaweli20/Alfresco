import { KeycloakOptions } from 'keycloak-angular';

const keycloakUrl = 'http://localhost:9080/auth';

const keycloakConfig: KeycloakOptions = {
  config: {
    url: keycloakUrl,
    realm: 'Postarion',
    clientId: 'postarion'
  },
  initOptions: {
    onLoad: 'login-required',
    // Vérifiez si `window` est défini avant d'utiliser `window.location.origin`
    silentCheckSsoRedirectUri: typeof window !== 'undefined' ? window.location.origin + '/assets/silent-check-sso.html' : ''
  },
};

export const environment = {
  production: false,
  keycloakOptions: keycloakConfig,
  keycloakUrl: keycloakUrl,
  baseUrl: 'http://localhost:8086/api/',
  baseHref: '/#'
};
