import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { StockSearchBarComponent } from './stock-search-bar/stock-search-bar.component';
import { StockSearchDummyComponent } from './stock-search-dummy/stock-search-dummy.component';
import { StockSearchPageComponent } from './stock-search-page/stock-search-page.component';
import { StockSearchResultComponent } from './stock-search-result/stock-search-result.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';

const routes: Routes = [
  { path:'' , redirectTo: '/search/home', pathMatch: 'full'},
  {
    path: 'search',
    component: StockSearchPageComponent,
    children: [
      { path: 'home', component: StockSearchDummyComponent},
      { path: ':symbol', component: StockSearchResultComponent}
    ]
  },
  { path: 'watchlist', component: WatchlistPageComponent},
  { path: 'portfolio', component: PortfolioPageComponent},
  { path: '**', redirectTo: '/search/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
