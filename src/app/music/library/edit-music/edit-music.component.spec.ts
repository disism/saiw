import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMusicComponent } from './edit-music.component';

describe('EditMusicComponent', () => {
  let component: EditMusicComponent;
  let fixture: ComponentFixture<EditMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMusicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
