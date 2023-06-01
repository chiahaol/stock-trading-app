import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, Subject, Subscription, throwError, timer } from 'rxjs';
import { catchError, map, retry, switchMap } from 'rxjs/operators';
import { AutocompleteResponse, EarningObject, News, NewsResponse, PeersResponse, ProfileResponse, QuoteResponse, RecommendationTrendObject, SocialSentimentResponse, StockCandleResponse } from '../interfaces/finnhub.interface';

@Injectable({
    providedIn: 'root',
})
export class FinnhubService implements OnInit{
  currentStock = "home";
  profile: ProfileResponse | undefined;
  quote: QuoteResponse | undefined;
  companyPeers: PeersResponse = {peers: []};
  news: NewsResponse = {topNews: []};
  marketOpen: boolean = false;
  chartTabData: number[][][] = [];
  isSearching = false;


  private changeEvent = new Subject<any>();
  onChangeListener = this.changeEvent.asObservable();
  private searchEvent = new Subject<any>();
  onSearchListener = this.searchEvent.asObservable();
  private autoRefreshEvent = new Subject<any>();
  autoRefreshListener = this.autoRefreshEvent.asObservable();
  private charTabDataEvent = new Subject<any>();
  chartTabDataListener = this.charTabDataEvent.asObservable();
  subscription: Subscription | undefined;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.subscription = timer(0, 1000).subscribe(()=> {console.log("FK")})
  }

  searchStock(symbol: string) {
    this.isSearching = true;
    this.searchEvent.next(this.isSearching);
    return forkJoin({
        profile: this.updateProfile(symbol),
        quote: this.updateQuote(symbol),
        peers: this.updatePeers(symbol),
        news: this.updateNews(symbol),
        chartTabData: this.getChartTabChartData(symbol)
    }).pipe(
        map((result) => {
          this.isSearching = false;
            this.searchEvent.next(this.isSearching);
            this.changeEvent.next(result);
            return result; 
        })
    );
  }
  
  updateProfile(symbol: string) {
    return this.http.get<ProfileResponse>(
        "https://csci571hw8-chiahaol.appspot.com/finnhub/profile",
        {observe: 'body', responseType: 'json', params: {"symbol": symbol}}
    ).pipe(
        map((response: ProfileResponse) => {
            this.profile = response;
            return response;
        })
    );
  }

  updateQuote(symbol: string) {
    return this.http.get<QuoteResponse>(
        "https://csci571hw8-chiahaol.appspot.com/finnhub/quote",
        {observe: 'body', responseType: 'json', params: {"symbol": symbol}}
    ).pipe(
        map((response: QuoteResponse) => {
            this.quote = response;
            this.marketOpen =  this.updateMarketOpen(this.quote.t * 1000);
            return response;
    }));
  }

  updatePeers(symbol: string) {
    return this.http.get<string[]>(
        "https://csci571hw8-chiahaol.appspot.com/finnhub/peers",
        {observe: 'body', responseType: 'json', params: {"symbol": symbol}}
    ).pipe(
        map((response: string[]) => {
            this.companyPeers.peers = response;
            return response;
        })
    );
  }

  updateNews(symbol: string) {
    return this.http.get<News[]>(
        "https://csci571hw8-chiahaol.appspot.com/finnhub/news",
        {observe: 'body', responseType: 'json', params: {"symbol": symbol}}
    ).pipe(
        map((response: News[]) => {
            this.news.topNews = response.filter(news => news.headline && news.image)
            return response;
        })
    );
  }

  updateMarketOpen(timestamp: number) {
    let currentTimestamp = new Date().getTime();
    return ((currentTimestamp - timestamp) < 5 * 60 * 1000) ? true : false;
  }

  getAutocomplete(queryString: string) {
    return this.http.get<AutocompleteResponse>(
        "https://csci571hw8-chiahaol.appspot.com/finnhub/autocomplete",
        {observe: 'body', responseType: 'json', params: {"queryString": queryString}}
    );
  }

  getCurrentPrice(symbol: string) {
    return this.http.get<QuoteResponse>(
      "https://csci571hw8-chiahaol.appspot.com/finnhub/quote",
        {observe: 'body', responseType: 'json', params: {"symbol": symbol}}
    ).pipe(
      map((response: QuoteResponse) => {
        return response.c;
      })
    );
  }

  getStockCandle(symbol: string, fromTimestamp: number, toTimestamp: number, resolution: string) {
    return this.http.get<StockCandleResponse>(
      "https://csci571hw8-chiahaol.appspot.com/finnhub/stockCandles",
        {observe: 'body', responseType: 'json', params: {"symbol": symbol, "fromTimestamp": fromTimestamp, "toTimestamp": toTimestamp, "resolution": resolution}}
    ).pipe(
      map((response: StockCandleResponse) => {
        return response;
      })
    );
  }

  getChartTabChartData(symbol: string) {
    let toTimestamp = Math.floor(Date.now() / 1000) ;
    let fromTimestamp = toTimestamp - 2 * 365 * 24 * 60 * 60;
    return this.getStockCandle(symbol, fromTimestamp, toTimestamp, "D").pipe(
      map((response: StockCandleResponse) => {
        if (!response.t) return response;
        let ohlc = response.t.map((timestamp, i) => [timestamp * 1000, response.o[i], response.h[i], response.l[i], response.c[i]]);
        let volumn = response.t.map((timestamp, i) => [timestamp * 1000, response.v[i]]);
        this.chartTabData = [ohlc, volumn];
        this.charTabDataEvent.next(response);
        return response;
    }));
  }

  getSocialSentiment(symbol: string) {
    return this.http.get<SocialSentimentResponse>(
      "https://csci571hw8-chiahaol.appspot.com/finnhub/socialSentiment",
        {observe: 'body', responseType: 'json', params: {"symbol": symbol}}
    ).pipe(
      map((response: SocialSentimentResponse) => {
        return response;
      })
    );
  }

  getRecommendationTrends(symbol: string) {
    return this.http.get<RecommendationTrendObject[]>(
      "https://csci571hw8-chiahaol.appspot.com/finnhub/recommendation",
        {observe: 'body', responseType: 'json', params: {"symbol": symbol}}
    ).pipe(
      map((response: RecommendationTrendObject[]) => {
        return response;
      })
    );
  }

  getEarnings(symbol: string) {
    return this.http.get<EarningObject[]>(
      "https://csci571hw8-chiahaol.appspot.com/finnhub/earnings",
        {observe: 'body', responseType: 'json', params: {"symbol": symbol}}
    ).pipe(
      map((response: EarningObject[]) => {
        return response;
      })
    );
  }

  reset() {
    this.profile = undefined;
    this.quote = undefined;
  }
}
