import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateService implements CanDeactivate<CanComponentDeactivate>{
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, nextState?: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate();
    }
}
