import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { FinnhubService } from '../services/finnhub.service';
import { Observable } from 'rxjs';
import { PeersResponse, ProfileResponse, QuoteResponse } from '../interfaces/finnhub.interface';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-stock-search-page',
  templateUrl: './stock-search-page.component.html',
  styleUrls: ['./stock-search-page.component.css']
})
export class StockSearchPageComponent implements OnInit {

  profile = this.finnhubService.profile;
  quote = this.finnhubService.quote;
  companyPeers = this.finnhubService.companyPeers;
  marketOpen = this.finnhubService.marketOpen;

  constructor(private finnhubService: FinnhubService, private appComponent: AppComponent) {}

  ngOnInit(): void { }
}
