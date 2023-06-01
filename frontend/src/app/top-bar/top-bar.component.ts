import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { FinnhubService } from '../services/finnhub.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input() currentPage: string = this.appComponent.currentPage;

  constructor(private finnhubService: FinnhubService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void { }

  navigateToSearchPage() {
    let currentSymbol = localStorage.getItem("currentSymbol");
    if (!currentSymbol) {
      this.router.navigate(['search', 'home']);
    } else {
      this.finnhubService.searchStock(currentSymbol).subscribe((response) => {
        this.router.navigate(['search', currentSymbol]);
      })
      
    }
  }

  navigateToWatchlistPage() {
    this.router.navigate(['watchlist']);
  }

  navigateToPortfoliotPage() {
    this.router.navigate(['portfolio']);
  }
}
