import { KeycloakService } from 'keycloak-angular';
import { environment } from './environments/environment';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    if (typeof window !== 'undefined') {
      // Code exécuté uniquement côté client
      return keycloak.init({
        config: environment.keycloakOptions.config,
        initOptions: environment.keycloakOptions.initOptions,
        enableBearerInterceptor: true,
      });
    } else {
      // Retourne une promesse résolue si le code est exécuté côté serveur
      return Promise.resolve();
    }
  };
}



