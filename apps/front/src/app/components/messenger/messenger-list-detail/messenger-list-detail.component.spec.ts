import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerListDetailComponent } from './messenger-list-detail.component';

describe('MessengerListDetailComponent', () => {
  let component: MessengerListDetailComponent;
  let fixture: ComponentFixture<MessengerListDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessengerListDetailComponent]
    });
    fixture = TestBed.createComponent(MessengerListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
