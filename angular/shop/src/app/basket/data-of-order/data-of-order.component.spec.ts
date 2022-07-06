import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOfOrderComponent } from './data-of-order.component';

describe('DataOfOrderComponent', () => {
  let component: DataOfOrderComponent;
  let fixture: ComponentFixture<DataOfOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataOfOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOfOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
