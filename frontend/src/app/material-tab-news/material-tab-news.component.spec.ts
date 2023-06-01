import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTabNewsComponent } from './material-tab-news.component';

describe('MaterialTabNewsComponent', () => {
  let component: MaterialTabNewsComponent;
  let fixture: ComponentFixture<MaterialTabNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTabNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTabNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
