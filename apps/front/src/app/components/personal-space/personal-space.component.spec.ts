import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSpaceComponent } from './personal-space.component';

describe('PersonalSpaceComponent', () => {
  let component: PersonalSpaceComponent;
  let fixture: ComponentFixture<PersonalSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalSpaceComponent]
    });
    fixture = TestBed.createComponent(PersonalSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
