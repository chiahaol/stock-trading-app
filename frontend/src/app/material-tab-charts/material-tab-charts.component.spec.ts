import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTabChartsComponent } from './material-tab-charts.component';

describe('MaterialTabChartsComponent', () => {
  let component: MaterialTabChartsComponent;
  let fixture: ComponentFixture<MaterialTabChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTabChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTabChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
