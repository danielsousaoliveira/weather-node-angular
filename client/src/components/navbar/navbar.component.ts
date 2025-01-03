import { Component, Output, EventEmitter } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideLanguages,
  lucideMoon,
  lucideSun,
  lucideGlobe,
  lucideUserCircle2,
} from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuBarComponent,
  HlmMenuBarItemDirective,
  HlmMenuComponent,
  HlmMenuItemDirective,
} from '@spartan-ng/ui-menu-helm';
import { DarkThemeSelectorService } from '../../services/dark-theme/dark-theme-service.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'spartan-navbar',
  standalone: true,
  imports: [
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuBarComponent,
    HlmMenuItemDirective,
    HlmMenuBarItemDirective,
    HlmIconComponent,
    TranslateModule,
  ],
  templateUrl: './navbar.component.html',
  providers: [
    provideIcons({
      lucideGlobe,
      lucideMoon,
      lucideSun,
      lucideLanguages,
      lucideUserCircle2,
    }),
  ],
})
export class NavbarComponent {
  @Output() timezoneChange = new EventEmitter<string>();
  constructor(
    protected darkThemeSelectorService: DarkThemeSelectorService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.translate.addLangs(['pt', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  isDarkMode = false;
  selectedLanguage = 'en';
  selectedTimezone = 'UTC';

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.darkThemeSelectorService.setDarkTheme();
    } else {
      this.darkThemeSelectorService.setLightTheme();
    }
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
    this.selectedLanguage = language;
  }

  setTimezone(timezone: string) {
    this.selectedTimezone = timezone;
    this.timezoneChange.emit(this.selectedTimezone);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
