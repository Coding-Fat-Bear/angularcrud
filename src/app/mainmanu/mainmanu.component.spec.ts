import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainmanuComponent } from './mainmanu.component';

describe('MainmanuComponent', () => {
  let component: MainmanuComponent;
  let fixture: ComponentFixture<MainmanuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainmanuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainmanuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
