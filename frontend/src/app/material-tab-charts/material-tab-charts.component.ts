import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProfileResponse, StockCandleResponse } from '../interfaces/finnhub.interface';
import { FinnhubService } from '../services/finnhub.service';
import * as Highcharts from 'highcharts/highstock';
import Indicator from "highcharts/indicators/indicators";
import Vbp from "highcharts/indicators/volume-by-price";
Indicator(Highcharts);
Vbp(Highcharts);
// Highcharts.setOptions({
//   time: {
//     timezone: 'America/Los_Angeles'
//   }
// });

@Component({
  selector: 'app-material-tab-charts',
  templateUrl: './material-tab-charts.component.html',
  styleUrls: ['./material-tab-charts.component.css']
})
export class MaterialTabChartsComponent implements OnInit {

  @Input() profile: ProfileResponse | undefined;
  
  highcharts: typeof Highcharts = Highcharts;
  chartData: number[][][] = this.finnhubService.chartTabData;
  chartOptions: Highcharts.Options = {};

  constructor(private finnhubService: FinnhubService) {
    this.finnhubService.chartTabDataListener.subscribe(() => {
      this.chartData = this.finnhubService.chartTabData;
      this.chartOptions = this.createChartOptions();
    })
  }

  ngOnInit(): void {
    this.chartOptions = this.createChartOptions();
  }

  createChartOptions() {
    let groupingUnits = [[
        'week',                         // unit name
        [1]                             // allowed multiples
    ], [
        'month',
        [1, 2, 3, 4, 6]
    ]];

    let chartOptions: Highcharts.Options = {
      title: {
          text: `${this.profile?.ticker} Historical`
      },
      subtitle: {
          text: 'With SMA and Volume by Price technical indicators'
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value: %e. %b}'
        }
      },
      yAxis: [{
          opposite: true,
          startOnTick: false,
          endOnTick: false,
          labels: {
              align: 'right',
              x: -3
          },
          title: {
              text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
              enabled: true
          }
      }, {
          opposite: true,
          labels: {
              align: 'right',
              x: -3
          },
          title: {
              text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
      }],

      tooltip: {
          split: true
      },

      plotOptions: {
      },

      series: [{
          type: 'candlestick',
          name: this.profile?.ticker,
          id: 'ohlc',
          zIndex: 2,
          data: this.chartData[0],
          showInLegend: false,
      }, {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: this.chartData[1],
          yAxis: 1,
          showInLegend: false,
      }, {
          type: 'vbp',
          linkedTo: 'ohlc',
          params: {
              volumeSeriesID: 'volume'
          },
          dataLabels: {
              enabled: false
          },
          zoneLines: {
              enabled: false
          }
      }, {
          type: 'sma',
          linkedTo: 'ohlc',
          zIndex: 1,
          marker: {
              enabled: false
          }
      }],
      navigator: {
        enabled: true,
        xAxis: {
            type: 'datetime',
            labels: {
              format: "{value: %b '%y}"
            }
        }
      },
      rangeSelector: {
        enabled: true,
        selected: 2,
        inputDateFormat: '%b %e, %Y'
      },
    }
    return chartOptions;
  }
}
