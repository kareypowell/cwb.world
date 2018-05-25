import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service';
import { User } from '../interfaces/member';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class MemberGuard implements CanActivate {
  user:User;
  constructor(private auth:AuthService){}
  ngOnInit() {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      take(1),
      map( user => user && user.roles.member ? true : false),
      tap( isMember =>{
        if(!isMember){
          console.error("Access Denied. Members only");
        }
      })
    )
  }
}
