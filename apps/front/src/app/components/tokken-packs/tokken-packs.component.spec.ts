import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokkenPacksComponent } from './tokken-packs.component';

describe('TokkenPacksComponent', () => {
  let component: TokkenPacksComponent;
  let fixture: ComponentFixture<TokkenPacksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokkenPacksComponent]
    });
    fixture = TestBed.createComponent(TokkenPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
