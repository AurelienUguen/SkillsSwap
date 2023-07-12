import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetDetailComponent } from './sheet-detail.component';

describe('SheetDetailComponent', () => {
  let component: SheetDetailComponent;
  let fixture: ComponentFixture<SheetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SheetDetailComponent]
    });
    fixture = TestBed.createComponent(SheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
