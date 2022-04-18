import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsheetComponent } from './monthsheet.component';

describe('MonthsheetComponent', () => {
  let component: MonthsheetComponent;
  let fixture: ComponentFixture<MonthsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
