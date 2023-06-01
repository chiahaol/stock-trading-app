import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSearchDummyComponent } from './stock-search-dummy.component';

describe('StockSearchDummyComponent', () => {
  let component: StockSearchDummyComponent;
  let fixture: ComponentFixture<StockSearchDummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSearchDummyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSearchDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
