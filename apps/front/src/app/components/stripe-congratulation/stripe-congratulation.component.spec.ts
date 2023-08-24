import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeCongratulationComponent } from './stripe-congratulation.component';

describe('StripeCongratulationComponent', () => {
  let component: StripeCongratulationComponent;
  let fixture: ComponentFixture<StripeCongratulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StripeCongratulationComponent]
    });
    fixture = TestBed.createComponent(StripeCongratulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
