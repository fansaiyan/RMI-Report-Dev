// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvServiceProvider } from 'src/app/config/env.service.provider';

export const environment = {
  production: false,
  url: EnvServiceProvider.useFactory().url,
  db: EnvServiceProvider.useFactory().db,
  url_smi: EnvServiceProvider.useFactory().url_smi,
  smi_survey_code: EnvServiceProvider.useFactory().smi_survey_code
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
