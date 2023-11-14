import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotifComponent } from './send-notif.component';

describe('SendNotifComponent', () => {
  let component: SendNotifComponent;
  let fixture: ComponentFixture<SendNotifComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendNotifComponent]
    });
    fixture = TestBed.createComponent(SendNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
