import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActorRoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { 
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise ((resolve, reject) => {
      const expectedRole = next.data.expectedRole;
      const currentActor = this.authService.getCurrentActor();
      let result = false;
      if (currentActor) {
        const activeRole = new RegExp(this.authService.getCurrentActorRole(), 'i');
        if (expectedRole.search(activeRole) !== -1) {
          result = true;
        } else{
          this.router.navigate(['denied-access'], {queryParams: {previousURL: state.url}})
        }
        resolve(result);
      } else {
        if (expectedRole.indexOf('anonymous') !== -1) {
          result = true;
        } else {
          this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        }
        resolve(result);
      }
    });
  }
}
