import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridPresentationComponent } from './datagrid-presentation.component';

describe('DataGridPresentationComponent', () => {
  let component: DataGridPresentationComponent;
  let fixture: ComponentFixture<DataGridPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGridPresentationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
