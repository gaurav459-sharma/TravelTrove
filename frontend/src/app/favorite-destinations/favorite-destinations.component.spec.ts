import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDestinationsComponent } from './favorite-destinations.component';

describe('FavoriteDestinationsComponent', () => {
  let component: FavoriteDestinationsComponent;
  let fixture: ComponentFixture<FavoriteDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteDestinationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
