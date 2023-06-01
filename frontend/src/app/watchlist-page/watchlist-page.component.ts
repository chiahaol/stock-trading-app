import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FinnhubService } from '../services/finnhub.service';
import { WatchlistService, WatchlistObject } from '../services/watchlist.service';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit {

  watchlist: WatchlistObject[] = [];

  constructor(private finnhubService: FinnhubService, private watchlistService: WatchlistService, private router: Router, private appComponent: AppComponent)  { }

  ngOnInit(): void {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  deleteWatchlistCard(symbol: string) {
    this.watchlistService.deleteSymbolFromWatchlist(symbol);
    this.watchlist = this.watchlistService.getWatchlist();
  }

  onClickWatchlistCard(symbol: string) {
    this.finnhubService.searchStock(symbol).subscribe((response) => {
      localStorage.setItem("currentSymbol", symbol);
      this.router.navigate(['search', symbol]);
    })
  }
}
