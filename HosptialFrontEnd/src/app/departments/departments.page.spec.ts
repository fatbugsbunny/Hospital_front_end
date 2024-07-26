import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentPage } from './department.page';

describe('HomePage', () => {
  let component: DepartmentPage;
  let fixture: ComponentFixture<DepartmentPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(DepartmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
