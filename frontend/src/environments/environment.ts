// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stripeKey: 'pk_test_HFeR2lSgAkLBWCcl9L1wSR7M',
  firebaseConfig :{
    apiKey: "AIzaSyDNvKedHqWj_b3zKlMy3z6DYJ0yW6Q0usM",
    authDomain: "fir-app-220117.firebaseapp.com",
    databaseURL: "https://fir-app-220117.firebaseio.com",
    projectId: "firebaseapp-220117",
    storageBucket: "firebaseapp-220117.appspot.com",
    messagingSenderId: "429387056804"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
