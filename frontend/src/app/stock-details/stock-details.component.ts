import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProfileResponse, QuoteResponse } from '../interfaces/finnhub.interface';
import { FinnhubService } from '../services/finnhub.service';
import { WatchlistService } from '../services/watchlist.service';
import { PortfolioService } from '../services/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent{
  @Input() profile: ProfileResponse | undefined;
  @Input() quote: QuoteResponse | undefined;
  @Input() marketOpen: boolean  = false;
  
  portfolioModalFlag = 0;
  buySuccess = false;
  sellSuccess = false;
  addToWatchlistSuccess = false;
  removedFromWatchlistSuccess = false;

  constructor(
    public finnhubService: FinnhubService, 
    private watchlistService: WatchlistService,
    private portfolioService: PortfolioService,
    private datePipe: DatePipe,
    private modalService: NgbModal
    ) { }

  getCurrentTime() {
    return new Date();
  }

  getMarketStatusMsg() {
    if (this.marketOpen) {
      return "Market is Open";
    } else {
      let lastDateTime = this.quote ? new Date(this.quote.t * 1000) : this.getCurrentTime();
      return `Market Closed on ${this.datePipe.transform(lastDateTime,'yyyy-MM-dd HH:mm:ss')}`;
    }
  }

  updateWatchlistStatus() {
    if (!this.profile || !this.profile.ticker) return;
    let ret = this.watchlistService.updateWatchlistStatus(this.profile.ticker);
    if (ret == 0) {
      this.addToWatchlistSuccess = true;
    } else if (ret == 1) {
      this.removedFromWatchlistSuccess = true;
    }
  }

  currentSymbolInWatchlist() {
    if (!this.profile || !this.profile.ticker) return;
    return this.watchlistService.symbolInWatchlist(this.profile.ticker);
  }

  currentSymbolInPortfolio() {
    if (!this.profile || !this.profile.ticker) return;
    return this.portfolioService.symbolInPortfolio(this.profile.ticker);
  }

  buyStock(quantity: number) {
    if (!this.profile || !this.profile.ticker) return;
    if (this.portfolioService.buyStock(this.profile.ticker, quantity) == -1) return;
    this.buySuccess = true;
  }

  sellStock(quantity: number) {
    if (!this.profile || !this.profile.ticker) return;
    if (this.portfolioService.sellStock(this.profile.ticker, quantity) == -1) return;
    this.sellSuccess = true;
  }

  getCurrentMoney() {
    return this.portfolioService.getCurrentMoney();
  }

  getCurrentAmount() {
    return this.portfolioService.getCurrentAmount(this.profile?.ticker);
  }

  openModal(modalType: any, flag: number) {
    this.portfolioModalFlag = flag;
    this.modalService.open(modalType);
  }

  canBuy(amount: number) {
    if (!this.quote || !this.quote.c) return false;
    let currentMoney = this.getCurrentMoney();
    if (amount <= 0) return false;
    if (amount * this.quote.c > currentMoney) return false;
    return true;
  }

  canSell(amount: number) {
    if (!this.profile || !this.profile.ticker) return false;
    if (amount <= 0) return false;
    let currentAmount = this.portfolioService.getCurrentAmount(this.profile.ticker);
    if (currentAmount < amount) return false;
    return true;
  }
}
