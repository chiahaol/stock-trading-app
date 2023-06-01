import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FinnhubService } from '../services/finnhub.service';

@Component({
  selector: 'app-stock-search-result',
  templateUrl: './stock-search-result.component.html',
  styleUrls: ['./stock-search-result.component.css']
})
export class StockSearchResultComponent{

  profile = this.finnhubService.profile;
  quote = this.finnhubService.quote;
  companyPeers = this.finnhubService.companyPeers;
  news = this.finnhubService.news;
  marketOpen = this.finnhubService.marketOpen;
  isSearching = false;

  constructor(private finnhubService: FinnhubService) {
    this.finnhubService.onChangeListener.subscribe(() => {
      this.updateDataFromService();
    });
    this.finnhubService.onSearchListener.subscribe((isSearching: boolean) => {
      this.isSearching = isSearching;
    })
    this.finnhubService.autoRefreshListener.subscribe(() => {
      this.quote = this.finnhubService.quote;
    })
  }

  updateDataFromService() {
    this.profile = this.finnhubService.profile;
    this.quote = this.finnhubService.quote;
    this.companyPeers = this.finnhubService.companyPeers;
    this.marketOpen = this.finnhubService.marketOpen;
    this.news = this.finnhubService.news;
  }
}
