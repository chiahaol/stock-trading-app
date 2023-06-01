import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsResponse } from '../interfaces/finnhub.interface';

@Component({
  selector: 'app-material-tab-news',
  templateUrl: './material-tab-news.component.html',
  styleUrls: ['./material-tab-news.component.css']
})
export class MaterialTabNewsComponent{

  @Input() news: NewsResponse = {topNews: []};

  constructor( private modalService: NgbModal) { }

  getDateTime(timestamp: number) {
    return new Date(timestamp * 1000);
  }

  openModal(modalName: any) {
    this.modalService.open(modalName);
  }
}
