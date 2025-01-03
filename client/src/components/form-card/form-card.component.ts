import { Component, inject, Output, EventEmitter } from '@angular/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  HlmErrorDirective,
  HlmFormFieldComponent,
} from '@spartan-ng/ui-formfield-helm';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { toast } from 'ngx-sonner';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'form-card',
  standalone: true,
  imports: [
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
  ],
  providers: [provideIcons({ lucideCheck, lucideChevronDown })],
  templateUrl: './form-card.component.html',
})
export class FormCardComponent {
  private _formBuilder = inject(FormBuilder);
  constructor(private http: HttpClient, private translate: TranslateService) {}

  apiURL = 'http://localhost:5000/api/weather/measurement';
  @Output() dataSubmitted = new EventEmitter<void>();

  form = this._formBuilder.group({
    city: ['', Validators.required],
    date: [this.getCurrentDate(), Validators.required],
    temperature: [null, Validators.required],
    networkPower: [
      null,
      [Validators.required, Validators.min(1), Validators.max(5)],
    ],
    rainingStatus: ['', Validators.required],
    altitude: [null, Validators.required],
  });

  currentDate = new Date();
  showToast() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        timezone: this.getTimezoneOffset(),
      };

      this.http.post(this.apiURL, formData).subscribe({
        next: (response) => {
          this.currentDate = new Date();
          toast('Measurement has been created', {
            description: this.currentDate.toString(),
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          });
          this.form.reset();
          this.dataSubmitted.emit();
        },
        error: (error) => {
          console.error('Error saving data:', error);
        },
      });
    }
  }

  resetForm() {
    this.form.reset();
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  getTimezoneOffset(): string {
    const offset = new Date().getTimezoneOffset();
    const hours = String(Math.abs(offset / 60)).padStart(2, '0');
    const minutes = String(Math.abs(offset % 60)).padStart(2, '0');
    const sign = offset > 0 ? '-' : '+';
    return `${sign}${hours}:${minutes}`;
  }
}
