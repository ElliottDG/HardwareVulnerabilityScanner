import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { WarningMessageComponent } from './warning-message.component';

describe('WarningMessageComponent', () => {
  let component: WarningMessageComponent;
  let fixture: ComponentFixture<WarningMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarningMessageComponent],
      imports: [MatIconModule]
    });
    fixture = TestBed.createComponent(WarningMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
