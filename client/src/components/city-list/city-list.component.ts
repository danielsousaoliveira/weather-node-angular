import { Component, OnInit, Input } from '@angular/core';
import { WeatherDataService } from '../../services/weather-data/weather-data.service';
import { WeatherData } from '../../services/weather-data/weather-data.service';
import { CommonModule } from '@angular/common';
import { DataCardComponent } from '../data-card/data-card.component';

@Component({
  selector: 'city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
  standalone: true,
  imports: [CommonModule, DataCardComponent],
})
export class CityListComponent implements OnInit {
  @Input() registries: WeatherData[] = [];
  cities: { [city: string]: WeatherData[] } = {};
  selectedCityData: WeatherData[] = [];
  showChart = false;
  selectedCity: string | null = null;

  constructor(private weatherService: WeatherDataService) {}

  ngOnChanges() {
    this.groupCitiesByMostRecentDate();
  }

  groupCitiesByMostRecentDate() {
    this.cities = this.registries.reduce((acc, cityData) => {
      const cityName = cityData.city.toLowerCase();
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(cityData);
      return acc;
    }, {} as { [city: string]: WeatherData[] });
  }

  showCharts(city: string) {
    if (this.selectedCity === city) {
      this.showChart = !this.showChart;
    } else {
      this.showChart = true;
      this.selectedCity = city;
      this.selectedCityData = this.cities[city.toLowerCase()];
    }
  }

  getCityKeys(): string[] {
    return Object.keys(this.cities);
  }

  ngOnInit(): void {
    this.weatherService.getWeatherData().subscribe({
      next: (data: WeatherData[]) => {
        this.registries = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }
}
