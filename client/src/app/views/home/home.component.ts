import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormCardComponent } from '../../../components/form-card/form-card.component';
import { CommonModule } from '@angular/common';
import { WeatherDataService } from '../../../services/weather-data/weather-data.service';
import { WeatherData } from '../../../services/weather-data/weather-data.service';
import { CityListComponent } from '../../../components/city-list/city-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    TranslateModule,
    FormCardComponent,
    CommonModule,
    CityListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  registries: WeatherData[] = [];
  currentSelectedTimezone: string = 'UTC';

  constructor(private weatherService: WeatherDataService) {}

  ngOnInit(): void {
    this.loadRegistries();
    const theme = localStorage.getItem('theme');
    const browserDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (theme !== null) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else if (browserDark) {
      document.documentElement.classList.add('dark');
    }
  }

  loadRegistries() {
    this.weatherService.getWeatherData().subscribe({
      next: (data) =>
        (this.registries = data.map((record) => ({
          ...record,
          date: this.adjustDateForTimezone(record.date, record.timezone),
        }))),
      error: (error) => console.error('Error loading registries:', error),
    });
  }

  handleDataSubmitted() {
    this.loadRegistries();
  }

  onTimezoneChange(timezone: string) {
    this.currentSelectedTimezone = timezone;
    this.loadRegistries();
    console.log('Timezone selected:', timezone);
  }

  adjustDateForTimezone(date: string, recordTimezone: string): string {
    const recordDate = new Date(date);

    const recordOffset = this.getTimezoneOffsetMinutes(
      recordTimezone ? recordTimezone : 'UTC'
    );
    const selectedOffset = this.getTimezoneOffsetMinutes(
      this.currentSelectedTimezone
    );
    const offsetDifference = selectedOffset - recordOffset;

    return new Date(
      recordDate.getTime() + offsetDifference * 60000
    ).toISOString();
  }

  getTimezoneOffsetMinutes(timezone: string): number {
    const now = new Date();

    const options = { timeZone: timezone, hour12: false };
    const localTime = now.toLocaleString('en-US', options);

    const timePart = localTime.split(',')[1].trim();

    const [hours, minutes] = timePart.split(':').map(Number);

    const totalOffsetMinutes = (hours * 60 + minutes) * -1;

    return totalOffsetMinutes;
  }
}
