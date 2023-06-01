import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator } from '@angular/forms';
import { FinnhubService } from './services/finnhub.service';
import { PortfolioService } from './services/portfolio.service';

@Directive({
  selector: '[appCanBuyValidator]'
})
export class CanBuyValidatorDirective implements Validator {
  @Input('appCanBuyValidator') symbol: string | undefined;
  
  constructor(private portfolioService: PortfolioService, private finnhubService: FinnhubService) { }

  validate(control: AbstractControl) {
    let portfolioObj = this.portfolioService.getPortfolioObj(this.symbol);
    let currenntPrice = (portfolioObj) ? portfolioObj.c : this.finnhubService.quote?.c;
    let currentMoney = portfolioObj.getCurrentMoney();
   
    if (control.value <= 0) {
      return { 'amountInvalid': true };
    }
    if (control.value * currenntPrice > currentMoney) {
      return { 'notEnoughMoney': true};
    }
    return null;
  }
}
