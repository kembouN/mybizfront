import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInfoBubleComponent } from './custom-info-buble.component';

describe('CustomInfoBubleComponent', () => {
  let component: CustomInfoBubleComponent;
  let fixture: ComponentFixture<CustomInfoBubleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInfoBubleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInfoBubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
