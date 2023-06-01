import { Injectable } from '@angular/core';
import { FinnhubService } from './finnhub.service';

export interface WatchlistObject {
  symbol: string;
  name: string | undefined;
  c: number;
  d: number;
  dp: number;
}

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private finnhubService: FinnhubService) { }

  updateWatchlistStatus(symbol: string | null) {
    if (!symbol) return;
    if (this.symbolInWatchlist(symbol)) {
      this.deleteSymbolFromWatchlist(symbol);
      return 1;
    } else {
      this.addSymbolToWatchlist(symbol);
      return 0;
    } 
  }

  getWatchlist() {
    let watchlistStr = localStorage.getItem("watchlist");
    return (watchlistStr) ? JSON.parse(watchlistStr) : [];
  }

  symbolInWatchlist(symbol: string | null) {
    if (!symbol) return;
    let watchlist = this.getWatchlist();
    return watchlist.some((watchlistObj: WatchlistObject) => watchlistObj.symbol === symbol);
  }

  /* Will only call this function when trying to add current stock to watchlist*/
  addSymbolToWatchlist(symbol: string) {
    if (!this.finnhubService.profile || !this.finnhubService.quote) return;
    let watchlist = this.getWatchlist();
    let watchlistObj: WatchlistObject = {
      symbol: symbol,
      name: this.finnhubService.profile.name,
      c: this.finnhubService.quote.c,
      d: this.finnhubService.quote.d,
      dp: this.finnhubService.quote.dp
    }
    watchlist.push(watchlistObj);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }

  deleteSymbolFromWatchlist(symbol: string) {
    let watchlist = this.getWatchlist();
    watchlist = watchlist.filter((watchlistObj: WatchlistObject) => watchlistObj.symbol != symbol);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
}
