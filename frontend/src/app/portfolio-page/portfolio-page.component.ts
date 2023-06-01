import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { PortfolioObject, PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  
  portfolio: PortfolioObject[] = []
  portfolioModalFlag = 0;
  stock = "";
  buySuccess = false;
  sellSuccess = false;
  isRefreshing = false;

  modalInputValue = 0;

  constructor(private portfolioService: PortfolioService, private modalService: NgbModal, private appComponent: AppComponent) { }

  ngOnInit(): void {
    if (this.portfolioService.getPortfolio().length == 0) return;
    this.isRefreshing = true;
    this.portfolioService.refreshPortfolio().subscribe(() => {
      this.portfolio = this.portfolioService.getPortfolio();
      this.isRefreshing = false;
    });
  }


  getCurrentMoney() {
    return this.portfolioService.getCurrentMoney();
  }

  buyStock(symbol: string) {
    let quantity = this.modalInputValue;
    if (this.portfolioService.buyStock(symbol, quantity) == -1) return;
    this.portfolio = this.portfolioService.getPortfolio();
    this.stock = symbol;
    this.buySuccess = true;
  }

  sellStock(symbol: string) {
    let quantity = this.modalInputValue;
    if (this.portfolioService.sellStock(symbol, quantity) == -1 ) return;
    this.portfolio = this.portfolioService.getPortfolio();
    this.stock = symbol;
    this.sellSuccess = true;
  }

  openModal(modalType: any, flag: number) {
    this.portfolioModalFlag = flag;
    this.modalService.open(modalType);
  }

  canBuy(currentPrice: number) {
    let amount = this.modalInputValue;
    let currentMoney = this.getCurrentMoney();
    if (amount <= 0) return false;
    if (amount * currentPrice > currentMoney) return false;
    return true;
  }

  canSell(currentAmount: number) {
    let amount = this.modalInputValue;
    if (amount <= 0) return false;
    if (currentAmount < amount) return false;
    return true;
  }
}
