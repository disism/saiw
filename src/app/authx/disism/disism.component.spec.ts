import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisismComponent } from './disism.component';

describe('DisismComponent', () => {
  let component: DisismComponent;
  let fixture: ComponentFixture<DisismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisismComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
