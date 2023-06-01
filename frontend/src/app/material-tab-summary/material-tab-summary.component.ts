import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeersResponse, ProfileResponse, QuoteResponse, StockCandleResponse } from '../interfaces/finnhub.interface';
import { FinnhubService } from '../services/finnhub.service';
import * as Highcharts from 'highcharts';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-material-tab-summary',
  templateUrl: './material-tab-summary.component.html',
  styleUrls: ['./material-tab-summary.component.css']
})
export class MaterialTabSummaryComponent implements OnInit{
  @Input() profile: ProfileResponse | undefined;
  @Input() quote: QuoteResponse | undefined;
  @Input() companyPeers: PeersResponse = {peers: []};
  @Input() marketOpen: boolean  = false;
  
  chartData: number[][] = []

  constructor(private finnhubService: FinnhubService, private router: Router) { }

  ngOnInit(): void {
    this.getChartData().subscribe((data: number[][]) => {
      this.chartData = data;
    })
  }

  highcharts: typeof Highcharts = Highcharts;

  viewPeer(symbol: string) {
    this.finnhubService.searchStock(symbol).subscribe((response) => {
      localStorage.setItem("currentSymbol", symbol);
      this.router.navigate(['search', symbol]);
    })
  }

  getChartOptions() {
    let chartOptions: Highcharts.Options = {
      title: {
        text: `${this.profile?.ticker} Hourly Price Variration`
      },
      plotOptions: {
        line: {
          color: '#fd0808',
        }
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        opposite: true,
        title: {
          text: null
        }
      },
      series: [
        {
          type: "line",
          data: this.chartData,
          showInLegend: false,  
        },
      ],
      time: {
        timezone: 'America/Los_Angeles'
      }
    };
    return chartOptions;
  }

  getChartData() {
    let symbol = (this.profile && this.profile.ticker) ? this.profile.ticker :  "";
    let toTimestamp = (this.marketOpen || !this.quote) ? Math.floor(Date.now() / 1000) : this.quote?.t;
    let fromTimestamp = toTimestamp - 6 * 60 * 60;
    return this.finnhubService.getStockCandle(symbol, fromTimestamp, toTimestamp, "5").pipe(
      map((response: StockCandleResponse) => {
      return response.t.map((timestamp, i) => [timestamp * 1000, response.c[i]]);
    }))
  }
}
