import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cancellable-card',
  template: `
    <div class="myCard">
      <button class="cancelBtn" [ngClass]="cancellable ? 'show' : 'hide'" (click)="onClickCancel()">
        <i class="bi bi-x cancel-icon"></i>
      </button>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./cancellable-card.component.css']
})
export class CancellableCardComponent {
  
  @Input() cancellable: boolean = true;
  @Output() onClickNotify = new EventEmitter(); 

  constructor() { }

  onClickCancel() {
    this.onClickNotify.emit("DELETE");
  }
}
