import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthxComponent } from './authx.component';

describe('AuthxComponent', () => {
  let component: AuthxComponent;
  let fixture: ComponentFixture<AuthxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
