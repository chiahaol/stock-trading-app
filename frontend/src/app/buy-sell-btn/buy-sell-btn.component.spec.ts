import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellBtnComponent } from './buy-sell-btn.component';

describe('BuySellBtnComponent', () => {
  let component: BuySellBtnComponent;
  let fixture: ComponentFixture<BuySellBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuySellBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
