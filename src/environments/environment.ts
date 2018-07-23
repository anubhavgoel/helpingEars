// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCMRCBZlayYXkhfyU8wRQvimDLRXj8WbPQ',
    authDomain: 'helping-ears.firebaseapp.com',
    databaseURL: 'https://helping-ears.firebaseio.com',
    projectId: 'helping-ears',
    storageBucket: 'helping-ears.appspot.com',
    messagingSenderId: '1050160757576'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
