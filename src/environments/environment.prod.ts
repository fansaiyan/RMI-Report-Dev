import { EnvServiceProvider } from 'src/app/config/env.service.provider';
export const environment = {
  production: true,
  url: EnvServiceProvider.useFactory().url,
  db: EnvServiceProvider.useFactory().db,
  url_smi: EnvServiceProvider.useFactory().url_smi,
  smi_survey_code: EnvServiceProvider.useFactory().smi_survey_code
};
