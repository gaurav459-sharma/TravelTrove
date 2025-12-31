import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationGuideComponent } from './destination-guide.component';

describe('DestinationGuideComponent', () => {
  let component: DestinationGuideComponent;
  let fixture: ComponentFixture<DestinationGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
