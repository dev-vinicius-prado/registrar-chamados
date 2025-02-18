import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCallComponent } from './register-call.component';

describe('RegisterCallComponent', () => {
  let component: RegisterCallComponent;
  let fixture: ComponentFixture<RegisterCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
