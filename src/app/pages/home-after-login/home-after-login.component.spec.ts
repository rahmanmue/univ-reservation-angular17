import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAfterLoginComponent } from './home-after-login.component';

describe('HomeAfterLoginComponent', () => {
  let component: HomeAfterLoginComponent;
  let fixture: ComponentFixture<HomeAfterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAfterLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAfterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
