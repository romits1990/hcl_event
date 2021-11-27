import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoremComponent } from './lazy-lorem.component';

describe('LazyLoremComponent', () => {
  let component: LazyLoremComponent;
  let fixture: ComponentFixture<LazyLoremComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyLoremComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyLoremComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
