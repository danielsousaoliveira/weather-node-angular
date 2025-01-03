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
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onRegister() {
    const { email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      toast('Passwords do not match');
      return;
    }

    this.authService
      .register(email, password)
      .pipe(
        tap(() => this.router.navigate(['/login'])),
        catchError((error) => {
          console.error('Registration failed', error);
          toast('Registration failed');
          return of(null);
        })
      )
      .subscribe();
  }

  resetForm() {
    this.registerForm.reset();
  }
}
