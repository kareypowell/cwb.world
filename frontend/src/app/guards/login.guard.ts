import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service';
import { User } from '../interfaces/member';
import { tap, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
  user:User;
  constructor(private auth:AuthService,
    private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.user$.pipe(
        take(1),
        map( user => user ? true : false), //user.roles.member
        tap( isMember =>{
          if(isMember){
            this.router.navigate(['/member-ui']);
          }
        })
      )
  }
}