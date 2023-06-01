import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTabInsightsComponent } from './material-tab-insights.component';

describe('MaterialTabInsightsComponent', () => {
  let component: MaterialTabInsightsComponent;
  let fixture: ComponentFixture<MaterialTabInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTabInsightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTabInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
