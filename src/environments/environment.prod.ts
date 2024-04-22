import { EnvServiceProvider } from 'src/app/config/env.service.provider';
export const environment = {
  production: true,
  url: EnvServiceProvider.useFactory().url,
  db: EnvServiceProvider.useFactory().db
};
