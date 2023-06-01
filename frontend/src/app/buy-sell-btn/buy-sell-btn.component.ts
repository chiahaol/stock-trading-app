import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-sell-btn',
  templateUrl: './buy-sell-btn.component.html',
  styleUrls: ['./buy-sell-btn.component.css']
})
export class BuySellBtnComponent implements OnInit {

  @Input() text: string = "";
  @Input() backgroundColor: string = "";
  @Input() shouldDisable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
