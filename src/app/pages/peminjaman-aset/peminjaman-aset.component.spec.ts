import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeminjamanAsetComponent } from './peminjaman-aset.component';

describe('PeminjamanAsetComponent', () => {
  let component: PeminjamanAsetComponent;
  let fixture: ComponentFixture<PeminjamanAsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeminjamanAsetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeminjamanAsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
