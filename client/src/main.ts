import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// import { Amplify } from 'aws-amplify';
// import { default as _config } from "./config.json";

// Amplify.configure({
//   Auth: {
//     mandatorySignIn: true,
//     region: _config.cognito.REGION,
//     userPoolId: _config.cognito.USER_POOL_ID,
//     userPoolWebClientId: _config.cognito.APP_CLIENT_ID
//   }
// });

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
