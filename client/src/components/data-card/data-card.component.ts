import { Component, Input } from '@angular/core';
import {
  lucideBox,
  lucideCheck,
  lucideChevronDown,
  lucideThermometer,
  lucideCalendar,
  lucideMountain,
  lucideWifi,
  lucideCloudRainWind,
} from '@ng-icons/lucide';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';

import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';

import {
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { WeatherChartComponent } from '../weather-chart/weather-chart.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'data-card',
  standalone: true,
  imports: [
    BrnCommandImports,
    HlmCommandImports,
    HlmIconComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardContentDirective,
    HlmAccordionContentComponent,
    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionContentComponent,
    HlmAccordionIconDirective,
    HlmIconComponent,
    HlmAlertDirective,
    HlmAlertTitleDirective,
    HlmAlertIconDirective,
    WeatherChartComponent,
    TranslateModule,
  ],
  providers: [
    provideIcons({
      lucideCheck,
      lucideChevronDown,
      lucideBox,
      lucideThermometer,
      lucideCalendar,
      lucideMountain,
      lucideWifi,
      lucideCloudRainWind,
    }),
  ],
  templateUrl: './data-card.component.html',
})
export class DataCardComponent {
  @Input() selectedCityData: any;
  constructor(private translate: TranslateService) {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const datePart = date.toLocaleDateString('en-CA');
    return `${time}, ${datePart}`;
  }
}
