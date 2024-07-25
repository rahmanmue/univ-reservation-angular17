import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasilityEditComponent } from './fasility-edit.component';

describe('FasilityEditComponent', () => {
  let component: FasilityEditComponent;
  let fixture: ComponentFixture<FasilityEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FasilityEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FasilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
