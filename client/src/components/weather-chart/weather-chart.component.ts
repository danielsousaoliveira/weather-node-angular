import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexTooltip,
  ChartComponent,
} from 'ng-apexcharts';
import { WeatherData } from '../../services/weather-data/weather-data.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export type ChartOptions = {
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  series: ApexAxisChartSeries;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'weather-chart',
  standalone: true,
  imports: [ChartComponent, CommonModule, TranslateModule],
  templateUrl: './weather-chart.component.html',
})
export class WeatherChartComponent implements OnChanges {
  @Input() cityData: WeatherData[] = [];
  constructor(private translate: TranslateService) {}

  chartOptions: ChartOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Values',
      },
    },
    series: [],
    tooltip: {
      shared: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const data = this.cityData[dataPointIndex];
        const date =
          this.translate.instant('tooltip.date') + ` ${data.date}<br>`;
        const temperature =
          this.translate.instant('tooltip.temperature') +
          ` ${series[0][dataPointIndex]} °C<br>`;
        const networkPower =
          this.translate.instant('tooltip.networkPower') +
          ` ${series[1][dataPointIndex]}<br>`;
        const altitude =
          this.translate.instant('tooltip.altitude') +
          ` ${data.altitude} m<br>`;
        const rainingStatus =
          this.translate.instant('tooltip.raining') + ` ${data.rainingStatus}`;

        return `
          <div style="padding: 5px;">
          ${date}${temperature}${networkPower}${altitude}${rainingStatus}
          </div>
        `;
      },
    },
  };
  chartData: ApexAxisChartSeries = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cityData']) {
      this.updateChart();
    }
  }

  private updateChart() {
    if (this.cityData.length > 0) {
      this.chartOptions.xaxis.categories = this.cityData.map(
        (data) => data.date
      );

      this.chartData = [
        {
          name: this.translate.instant('tooltip.temperature') + ' (°C)',
          data: this.cityData.map((data) => data.temperature),
        },
        {
          name: this.translate.instant('tooltip.networkPower').slice(0, -1),
          data: this.cityData.map((data) => data.networkPower),
        },
      ];
    }
  }
}
