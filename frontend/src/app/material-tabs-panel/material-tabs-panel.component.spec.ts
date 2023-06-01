import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTabsPanelComponent } from './material-tabs-panel.component';

describe('MaterialTabsPanelComponent', () => {
  let component: MaterialTabsPanelComponent;
  let fixture: ComponentFixture<MaterialTabsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTabsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTabsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
