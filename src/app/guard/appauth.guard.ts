import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AppauthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.keycloakService.isLoggedIn();
  }
}
