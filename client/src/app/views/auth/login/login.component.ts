import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  HlmErrorDirective,
  HlmFormFieldComponent,
} from '@spartan-ng/ui-formfield-helm';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@spartan-ng/brain/forms';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    BrnCommandImports,
    HlmCommandImports,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    HlmFormFieldComponent,
    HlmToasterComponent,
    ReactiveFormsModule,
    HlmErrorDirective,
    CommonModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(
        tap((response: any) => {
          const token = response.token;
          if (token) {
            localStorage.setItem('authToken', token);
            this.router.navigate(['/']);
          }
        }),
        catchError((error) => {
          console.error('Login failed', error);
          toast('Login failed');
          return of(null);
        })
      )
      .subscribe();
  }

  resetForm() {
    this.loginForm.reset();
    this.submitted = false;
  }
}
