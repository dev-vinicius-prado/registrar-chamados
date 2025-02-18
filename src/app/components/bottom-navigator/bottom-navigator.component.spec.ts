import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigatorComponent } from './bottom-navigator.component';

describe('BottomNavigatorComponent', () => {
  let component: BottomNavigatorComponent;
  let fixture: ComponentFixture<BottomNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavigatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
