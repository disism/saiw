import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistManagerComponent } from './artist-manager.component';

describe('ArtistManagerComponent', () => {
  let component: ArtistManagerComponent;
  let fixture: ComponentFixture<ArtistManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
