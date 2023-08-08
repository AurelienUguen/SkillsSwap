import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerSendFormComponent } from './messenger-send-form.component';

describe('MessengerSendFormComponent', () => {
  let component: MessengerSendFormComponent;
  let fixture: ComponentFixture<MessengerSendFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessengerSendFormComponent]
    });
    fixture = TestBed.createComponent(MessengerSendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
