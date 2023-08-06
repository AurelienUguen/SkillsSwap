import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerListComponent } from './messenger-list.component';

describe('MessengerListComponent', () => {
  let component: MessengerListComponent;
  let fixture: ComponentFixture<MessengerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessengerListComponent]
    });
    fixture = TestBed.createComponent(MessengerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
