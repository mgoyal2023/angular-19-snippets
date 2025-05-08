import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTabComponent } from './api-tab.component';

describe('ApiTabComponent', () => {
  let component: ApiTabComponent;
  let fixture: ComponentFixture<ApiTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
