import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteDepartmentPopupComponent } from './delete-department-popup.component';

describe('DeleteDepartmentFormComponent', () => {
  let component: DeleteDepartmentPopupComponent;
  let fixture: ComponentFixture<DeleteDepartmentPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDepartmentPopupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDepartmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
