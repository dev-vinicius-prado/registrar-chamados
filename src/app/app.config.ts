import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './services/error-handler.service';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService }
  ]
};
