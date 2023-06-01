import { Injectable, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FinnhubService } from './finnhub.service';

export interface PortfolioObject {
  symbol: string;
  name: string;
  c: number;
  quantity: number;
  totalCost: number;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService{

  constructor(private finnhubService: FinnhubService) { }

  buyStock(symbol: string | null, amount: number) {
    if (!symbol || amount <= 0) return -1;
    let portfolio = this.getPortfolio();
    let index = this.getIndexOfStock(symbol);
    let portfolioObj = (index != -1) ? portfolio[index] : this.createNewPortfolioObj(symbol);
    let currentMoney = this.getCurrentMoney();
    let cost = portfolioObj.c * amount;
    if (currentMoney < cost) return -1;
    
    portfolioObj.quantity += amount;
    portfolioObj.totalCost += cost;
    if (index == -1) portfolio.push(portfolioObj);
    this.updateCurrentMoney(currentMoney - cost);
    this.updatePortfolio(portfolio);
    return 0;
  }

  sellStock(symbol: string | null, amount: number) {
    if (!symbol) return -1;
    let portfolio = this.getPortfolio();
    let index = this.getIndexOfStock(symbol);
    if (index == -1) return -1;
    let portfolioObj = portfolio[index];
    if (amount > portfolioObj.quantity || amount <= 0) return -1;
    let profit = portfolioObj.c * amount;
    
    portfolioObj.quantity -= amount;
    portfolioObj.totalCost -= profit;
    let currentMoney = this.getCurrentMoney();
    this.updateCurrentMoney(currentMoney + profit);
    if (portfolioObj.quantity == 0) {
      this.deleteSymbolFromPortfolio(symbol);
    } else {
      this.updatePortfolio(portfolio);
    }
    return 0;
  }

  deleteSymbolFromPortfolio(symbol: string) {
    let portfolio = this.getPortfolio();
    portfolio = portfolio.filter((portfolioObj: PortfolioObject) => portfolioObj.symbol != symbol);
    this.updatePortfolio(portfolio);
  }

  symbolInPortfolio(symbol: string | null) {
    if (!symbol) return;
    let portfolio = this.getPortfolio();
    return portfolio.some((portfolioObj: PortfolioObject) => portfolioObj.symbol === symbol);
  }

  getPortfolio() {
    let portfolioStr = localStorage.getItem("portfolio");
    return (portfolioStr) ? JSON.parse(portfolioStr) : [];
  }

  getIndexOfStock(symbol: string) {
    let portfolio = this.getPortfolio();
    return portfolio.findIndex((portfolioObj: PortfolioObject) => portfolioObj.symbol === symbol);
  }
  
  /* Will only call this function when trying to buy current stock*/
  createNewPortfolioObj(symbol: string) {
    if (!this.finnhubService.profile || !this.finnhubService.quote) return;
    let portfolioObj: PortfolioObject = {
      symbol: symbol,
      name: this.finnhubService.profile.name,
      c: this.finnhubService.quote.c,
      quantity: 0,
      totalCost: 0
    };
    return portfolioObj;
  }

  getPortfolioObj(symbol: string | undefined) {
    if (!symbol) return null;
    let portfolio = this.getPortfolio();
    let index = this.getIndexOfStock(symbol);
    if (index == -1) return null;
    let portfolioObj = portfolio[index];
    return portfolioObj;
  }

  getCurrentMoney() {
    let currentMoney = localStorage.getItem("currentMoney");
    if(!currentMoney) {
      this.updateCurrentMoney(25000);
      return 25000;
    }
    return Number(currentMoney);
  }

  updateCurrentMoney(currentMoney: number) {
    localStorage.setItem("currentMoney", currentMoney.toString());
  }

  updatePortfolio(portfolio: PortfolioObject[]) {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }

  updateCurrentPrice(portfolioObj: PortfolioObject) {
    return this.finnhubService.getCurrentPrice(portfolioObj.symbol).pipe(
      map((currentPrice: number) => {
        portfolioObj.c = currentPrice;
        return currentPrice;
      })
    );
  }

  refreshPortfolio() {
    let tasks: Observable<number>[] = [];
    let portfolio = this.getPortfolio();
    portfolio.forEach((portfolioObj: PortfolioObject) => {
      tasks.push(this.updateCurrentPrice(portfolioObj));
    });
    return forkJoin(tasks).pipe(
      map((response) => {
        this.updatePortfolio(portfolio);
      })
    );
  }

  getCurrentAmount(symbol: string | undefined) {
    if (!symbol) return 0;
    let portfolioObj = this.getPortfolioObj(symbol);
    if (!portfolioObj) return 0;
    return portfolioObj.quantity;
  }
}
