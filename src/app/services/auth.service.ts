import { Injectable } from '@angular/core';
import { KeycloakService, KeycloakEvent, KeycloakEventType } from 'keycloak-angular';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated = false;
  private profile: KeycloakProfile | undefined;
  private keycloakEvents: Subject<KeycloakEvent>;

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly tokenStorageService: TokenStorageService,
    private readonly router: Router
  ) {
    this.keycloakEvents = this.keycloakService.keycloakEvents$;
    this.initializeKeycloakEvents();
    this.loadUserProfile();
  }

  private initializeKeycloakEvents(): void {
    this.keycloakEvents.subscribe({
      next: (event: KeycloakEvent) => {
        switch (event.type) {
          case KeycloakEventType.OnAuthSuccess:
            console.log('Keycloak event: AuthSuccess');
            this._authenticated = true;
            break;
          case KeycloakEventType.OnAuthLogout:
            console.log('Keycloak event: AuthLogout');
            this._authenticated = false;
            break;
          case KeycloakEventType.OnTokenExpired:
            console.log('Keycloak event: TokenExpired');
            this.keycloakService.updateToken();
            break;
          case KeycloakEventType.OnAuthRefreshSuccess:
            console.log('Keycloak event: AuthRefreshSuccess');
            break;
        }
      },
    });
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  public async login(): Promise<void> {
    return this.keycloakService.login();
  }

  public logout(): void {
    const redirectUri = 'http://localhost:4200/';
    this.keycloakService.logout(redirectUri).then(() => {
      this.tokenStorageService.signOut();
      this._authenticated = false;
      this.profile = undefined;
    });
  }

  public async loadUserProfile(): Promise<void> {
    if (this.profile) return; // Ne pas charger le profil si déjà chargé

    try {
      const isLoggedIn = await this.keycloakService.isLoggedIn();
      if (!isLoggedIn) {
        console.warn('Utilisateur non connecté.');
        this._authenticated = false;
        return;
      }

      const profile = await this.keycloakService.loadUserProfile();
      console.log('Profile loaded:', profile);
      this._authenticated = true;
      this.profile = profile;

      const token = await this.keycloakService.getToken();
      this.tokenStorageService.saveUser(profile);
      this.tokenStorageService.saveToken(token);

      const tokenParsed: any = this.keycloakService.getKeycloakInstance().tokenParsed;
      const roles: string[] = tokenParsed?.realm_access?.roles ?? [];
      this.navigateBasedOnRole(roles);
    } catch (error) {
      console.error('Error loading user profile:', error);
      this._authenticated = false;
      this.profile = undefined;
    }
  }

  public getUsername(): string {
    return this.profile?.username ?? '';
  }

  public getFullname(): string {
    if (!this.profile) {
      console.warn('Le profil utilisateur n\'est pas défini.');
      return '';
    }
    const firstName = this.profile.firstName ?? '';
    const lastName = this.profile.lastName ?? '';
    return `${firstName} ${lastName}`.trim();
  }

  private navigateBasedOnRole(roles: string[]): void {
    let route: string;

    if (roles.includes('ROLE_ADMIN')) {
      route = '/admin-dashboard';
    } else if (roles.includes('ROLE_USER')) {
      route = '/user-dashboard';
    } else {
      console.error('Role not recognized');
      return;
    }

    this.router.navigate([route]);
  }
}
