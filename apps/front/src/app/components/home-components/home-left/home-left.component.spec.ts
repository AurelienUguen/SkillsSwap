import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeftComponent } from './home-left.component';

describe('HomeLeftComponent', () => {
  let component: HomeLeftComponent;
  let fixture: ComponentFixture<HomeLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeLeftComponent]
    });
    fixture = TestBed.createComponent(HomeLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
