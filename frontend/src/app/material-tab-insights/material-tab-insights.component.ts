import { Component, Input, OnInit } from '@angular/core';
import { FinnhubService } from '../services/finnhub.service';
import * as Highcharts from 'highcharts/highstock';
import Indicator from "highcharts/indicators/indicators";
import Vbp from "highcharts/indicators/volume-by-price";
import { EarningObject, ProfileResponse, RecommendationTrendObject, SocialSentimentObject, SocialSentimentResponse } from '../interfaces/finnhub.interface';
Indicator(Highcharts);
Vbp(Highcharts);

@Component({
  selector: 'app-material-tab-insights',
  templateUrl: './material-tab-insights.component.html',
  styleUrls: ['./material-tab-insights.component.css']
})
export class MaterialTabInsightsComponent implements OnInit {
  
  @Input() profile: ProfileResponse | undefined;
  
  highcharts: typeof Highcharts = Highcharts;
  recommendationChartData: number[][] = [];
  recommendationPeriod: string[] = []
  recommendationChartOptions: Highcharts.Options = {};
  socialSentimentChartData: number[][] = [];
  earningsChartData: number[][] = [];
  earningsChartCategory: string[] = []
  earningsChartOptions: Highcharts.Options = {};


  constructor(private finnhubService: FinnhubService) { }

  ngOnInit(): void {
    let symbol = (this.profile && this.profile.ticker) ? this.profile.ticker : "";
    this.finnhubService.getRecommendationTrends(symbol).subscribe((response: RecommendationTrendObject[]) => {
      let stongBuy = response.map((obj: RecommendationTrendObject) => obj.strongBuy);
      let buy = response.map((obj: RecommendationTrendObject) => obj.buy);
      let hold = response.map((obj: RecommendationTrendObject) => obj.hold);
      let sell = response.map((obj: RecommendationTrendObject) => obj.sell);
      let strongSell = response.map((obj: RecommendationTrendObject) => obj.strongSell);
      let period = response.map((obj: RecommendationTrendObject) => obj.period);
      this.recommendationChartData = [stongBuy, buy, hold, sell, strongSell];
      this.recommendationPeriod = period;
      this.recommendationChartOptions = this.createRecommendationChartOptions();
    });

    this.finnhubService.getSocialSentiment(symbol).subscribe((response: SocialSentimentResponse) => {
      let redditData = response.reddit;
      let redditTotal = [0, 0, 0];
      redditData.forEach((obj: SocialSentimentObject) => {
        redditTotal[0] += (obj.mention) ? obj.mention : 0;
        redditTotal[1] += (obj.positiveMention) ? obj.positiveMention : 0;
        redditTotal[2] += (obj.negativeMention) ? obj.negativeMention : 0;
      });
      let twitterData = response.twitter;
      let twitterTotal = [0, 0, 0];
      twitterData.forEach((obj: SocialSentimentObject) => {
        twitterTotal[0] += (obj.mention) ? obj.mention : 0;
        twitterTotal[1] += (obj.positiveMention) ? obj.positiveMention : 0;
        twitterTotal[2] += (obj.negativeMention) ? obj.negativeMention : 0;
      });
      this.socialSentimentChartData = [redditTotal, twitterTotal];
    });

    this.finnhubService.getEarnings(symbol).subscribe((response: EarningObject[]) => {
      let actual: number[] = []
      let estimate: number[] = []
      let surprise: number[] = []
      let category: string[] = []
      response.forEach((obj: EarningObject) => {
        let a = obj.actual ? obj.actual : 0;
        let e = obj.estimate ? obj.estimate : 0;
        let s = obj.surprise ? obj.surprise : 0;
        actual.push(a);
        estimate.push(e);
        surprise.push(s);
        category.push(`${obj.period}<br>Surprise: ${obj.surprise}`);
      })
      this.earningsChartData = [actual, estimate, surprise];
      this.earningsChartCategory = category;
      this.earningsChartOptions = this.createEarningsChartOptions();
    });
  }


  createRecommendationChartOptions() {
    let chartOptions: Highcharts.Options = {
      title: {
          text: 'Recommendation Trends'
      },
      colors: ['#176f37', '#1db954', '#b98b1d', '#f45b5b', '#813131'],
      xAxis: {
          categories: this.recommendationPeriod
      },
      yAxis: {
          min: 0,
          title: {
              text: '#Analysis',
              align: 'high'
          },
          stackLabels: {
              enabled: false
          }
      },
      tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
          column: {
              stacking: 'normal',
              dataLabels: {
                  enabled: true
              }
          }
      },
      series: [{
          name: 'Strong Buy',
          type: 'column',
          data: this.recommendationChartData[0]
      }, {
          name: 'Buy',
          type: 'column',
          data: this.recommendationChartData[1]
      }, {
          name: 'Hold',
          type: 'column',
          data: this.recommendationChartData[2]
      }, {
          name: 'Sell',
          type: 'column',
          data: this.recommendationChartData[3]
      }, {
          name: 'Strong Sell',
          type: 'column',
          data: this.recommendationChartData[4]
      }]
    };
    return chartOptions;
  }

  createEarningsChartOptions() {
    let chartOptions: Highcharts.Options = {
      title: {
        text: `Historical EPS Surprises`
      },
      plotOptions: {
        line: {
          color: '#fd0808',
        }
      },
      xAxis: {
        categories: this.earningsChartCategory
      },
      yAxis: {
        title: {
          text: "Quarterly EPS"
        }
      },
      series: [
        {
          name: "Actual",
          type: "spline",
          data: this.earningsChartData[0],
        },
        {
          name: "Estimate",
          type: "spline",
          data: this.earningsChartData[1],
        }
      ],
    };
    return chartOptions;
  }
}
