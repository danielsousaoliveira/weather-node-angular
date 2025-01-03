import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { Observable, of } from 'rxjs';
import { dictionaries } from '../features/internationalization';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private dictionaries: Record<string, any>) {}

  getTranslation(lang: string): Observable<any> {
    const translations = this.dictionaries[lang];
    return of(translations || {});
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: () => new CustomTranslateLoader(dictionaries),
        },
        defaultLanguage: 'en',
      }),
    ]),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimationsAsync(),
  ],
};
