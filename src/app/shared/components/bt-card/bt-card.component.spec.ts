import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtCardComponent } from './bt-card.component';

describe('BtCardComponent', () => {
  let component: BtCardComponent;
  let fixture: ComponentFixture<BtCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
