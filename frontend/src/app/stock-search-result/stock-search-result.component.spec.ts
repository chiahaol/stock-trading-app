import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSearchResultComponent } from './stock-search-result.component';

describe('StockSearchResultComponent', () => {
  let component: StockSearchResultComponent;
  let fixture: ComponentFixture<StockSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
