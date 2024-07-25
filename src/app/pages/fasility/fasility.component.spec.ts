import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasilityComponent } from './fasility.component';

describe('FasilityComponent', () => {
  let component: FasilityComponent;
  let fixture: ComponentFixture<FasilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FasilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FasilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
