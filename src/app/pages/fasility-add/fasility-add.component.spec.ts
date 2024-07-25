import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FasilityAddComponent } from './fasility-add.component';

describe('FasilityAddComponent', () => {
  let component: FasilityAddComponent;
  let fixture: ComponentFixture<FasilityAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FasilityAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FasilityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
