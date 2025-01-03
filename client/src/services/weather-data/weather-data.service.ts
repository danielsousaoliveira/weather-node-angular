import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface WeatherData {
  _id?: string;
  city: string;
  temperature: number;
  rainingStatus: string;
  date: string;
  networkPower: number;
  altitude: number;
  timezone: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private apiURL = 'http://localhost:5000/api/weather/data';

  constructor(private http: HttpClient) {}

  addWeatherData(data: WeatherData): Observable<any> {
    return this.http.post(this.apiURL, data);
  }

  getWeatherData(): Observable<WeatherData[]> {
    return this.http
      .get<WeatherData[]>(this.apiURL)
      .pipe(catchError(() => of([])));
  }
}
