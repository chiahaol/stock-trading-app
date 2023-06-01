import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellableCardComponent } from './cancellable-card.component';

describe('CancellableCardComponent', () => {
  let component: CancellableCardComponent;
  let fixture: ComponentFixture<CancellableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellableCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
