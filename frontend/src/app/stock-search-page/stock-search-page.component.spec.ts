import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSearchPageComponent } from './stock-search-page.component';

describe('StockSearchPageComponent', () => {
  let component: StockSearchPageComponent;
  let fixture: ComponentFixture<StockSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
