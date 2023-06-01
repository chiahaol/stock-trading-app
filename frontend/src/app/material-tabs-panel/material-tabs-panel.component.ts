import { Component, Input, OnInit } from '@angular/core';
import { NewsResponse, PeersResponse, ProfileResponse, QuoteResponse } from '../interfaces/finnhub.interface';

@Component({
  selector: 'app-material-tabs-panel',
  templateUrl: './material-tabs-panel.component.html',
  styleUrls: ['./material-tabs-panel.component.css']
})
export class MaterialTabsPanelComponent{
  @Input() profile: ProfileResponse | undefined;
  @Input() quote: QuoteResponse | undefined;
  @Input() companyPeers: PeersResponse = {peers: []};
  @Input() news: NewsResponse = {topNews: []};
  @Input() marketOpen: boolean  = false;
  
  links = ['Summary', 'Top News', 'Charts', 'Insights'];
  activeLink = this.links[0];
  
  constructor() { }

}
