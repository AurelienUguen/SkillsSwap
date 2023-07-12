import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDateComponent } from './form-date.component';

describe('FormDateComponent', () => {
  let component: FormDateComponent;
  let fixture: ComponentFixture<FormDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDateComponent]
    });
    fixture = TestBed.createComponent(FormDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
