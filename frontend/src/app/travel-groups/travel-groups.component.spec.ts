import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelGroupsComponent } from './travel-groups.component';

describe('TravelGroupsComponent', () => {
  let component: TravelGroupsComponent;
  let fixture: ComponentFixture<TravelGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
