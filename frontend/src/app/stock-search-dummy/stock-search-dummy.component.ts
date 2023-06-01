import { Component, OnInit } from '@angular/core';
import { FinnhubService } from '../services/finnhub.service';

@Component({
  selector: 'app-stock-search-dummy',
  templateUrl: './stock-search-dummy.component.html',
  styleUrls: ['./stock-search-dummy.component.css']
})
export class StockSearchDummyComponent implements OnInit {

  constructor(private finnhubService: FinnhubService) { }

  ngOnInit(): void {
    localStorage.removeItem("currentSymbol");
    this.finnhubService.reset();
  }

}
