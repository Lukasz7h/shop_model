import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymantMethodComponent } from './paymant-method.component';

describe('PaymantMethodComponent', () => {
  let component: PaymantMethodComponent;
  let fixture: ComponentFixture<PaymantMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymantMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymantMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
