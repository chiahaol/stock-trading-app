import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { AutocompleteOption, AutocompleteResponse } from '../interfaces/finnhub.interface';
import { FinnhubService } from '../services/finnhub.service';

@Component({
  selector: 'app-stock-search-bar',
  templateUrl: './stock-search-bar.component.html',
  styleUrls: ['./stock-search-bar.component.css']
})
export class StockSearchBarComponent implements OnInit{

  myControl = new FormControl();
  filteredOptions: AutocompleteOption[] | undefined;
  loadingAutocomplete = false;
  emptyInput = false;
  stockNotFound = false;
  isSearching = false;

  constructor(private finnhubService: FinnhubService, private router: Router) {
    this.finnhubService.onSearchListener.subscribe((isSearching: boolean) => {
      this.isSearching = isSearching;
    })
  }

  ngOnInit() {
    this.myControl.valueChanges.pipe(
      switchMap((value: string) => {
        this.loadingAutocomplete = true;
        return this.finnhubService.getAutocomplete(value);
      })
    ).subscribe((response: AutocompleteResponse) => {
      this.loadingAutocomplete = false;
      this.filteredOptions = response.result.filter(option => this.myFilter(option));
    });
  }

  displayFn(option: AutocompleteOption): string {
    return option? option.symbol : '';
  }

  myFilter(option: AutocompleteOption) {
    return option.symbol && option.description && option.type && option.type == "Common Stock" && !option.symbol.includes('.');
  }

  submitQuery(symbol: string) {
    this.filteredOptions = undefined;
    this.loadingAutocomplete = false;
    this.emptyInput = false;
    this.stockNotFound = false;
    if (!symbol) {
      this.emptyInput = true;
      this.router.navigate(['search', 'home']);
      return;
    }
    symbol = symbol.toUpperCase();
    this.finnhubService.searchStock(symbol).subscribe((response) => {
      if (!this.finnhubService.profile || !this.finnhubService.profile.ticker) {
        this.stockNotFound = true;
        this.router.navigate(['search', 'home']);
        return;
      }
      localStorage.setItem("currentSymbol", symbol);
      this.router.navigate(['search', symbol]);
    })
  }

  myClear() {
    this.emptyInput = false;
    this.stockNotFound = false;
    this.router.navigate(['search', 'home']);
  }
}
