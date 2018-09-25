import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userId: string;
  membership: any;

  constructor() {

    /*
    this.membership = this.afAuth.authState
      .do(user => this.userId = user.uid)
      .switchMap(user => {
        return this.db.object(`users/${user.uid}/pro-membership`);
      });
      */

  }

    processPayment(token: any) {
      /*
      return this.db.object(`/users/${this.userId}/pro-membership`)
                    .update({ token: token.id });
                    */
    }
}