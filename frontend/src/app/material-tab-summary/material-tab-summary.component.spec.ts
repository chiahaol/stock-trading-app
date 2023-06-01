import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTabSummaryComponent } from './material-tab-summary.component';

describe('MaterialTabSummaryComponent', () => {
  let component: MaterialTabSummaryComponent;
  let fixture: ComponentFixture<MaterialTabSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTabSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTabSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
