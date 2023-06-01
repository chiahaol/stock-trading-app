import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { StockSearchPageComponent } from './stock-search-page/stock-search-page.component';
import { StockSearchBarComponent } from './stock-search-bar/stock-search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { BuySellBtnComponent } from './buy-sell-btn/buy-sell-btn.component';
import { MaterialTabsPanelComponent } from './material-tabs-panel/material-tabs-panel.component';
import { MaterialTabSummaryComponent } from './material-tab-summary/material-tab-summary.component';
import { MaterialTabNewsComponent } from './material-tab-news/material-tab-news.component';
import { MaterialTabChartsComponent } from './material-tab-charts/material-tab-charts.component';
import { MaterialTabInsightsComponent } from './material-tab-insights/material-tab-insights.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { StockSearchResultComponent } from './stock-search-result/stock-search-result.component';
import { StockSearchDummyComponent } from './stock-search-dummy/stock-search-dummy.component';
import { FooterComponent } from './footer/footer.component';
import { CancellableCardComponent } from './cancellable-card/cancellable-card.component';
import { CanBuyValidatorDirective } from './can-buy-validator.directive';
import { CanSellValidatorDirective } from './can-sell-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    StockSearchPageComponent,
    StockSearchBarComponent,
    StockDetailsComponent,
    BuySellBtnComponent,
    MaterialTabsPanelComponent,
    MaterialTabSummaryComponent,
    MaterialTabNewsComponent,
    MaterialTabChartsComponent,
    MaterialTabInsightsComponent,
    WatchlistPageComponent,
    PortfolioPageComponent,
    StockSearchResultComponent,
    StockSearchDummyComponent,
    FooterComponent,
    CancellableCardComponent,
    CanBuyValidatorDirective,
    CanSellValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HighchartsChartModule,
    FormsModule,
    RouterModule.forRoot(
      [
        { path: '',   redirectTo: '/search/home', pathMatch: 'full' },
      ]
    ),
  ],
  providers: [DatePipe, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
