import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridComponent } from './datagrid.component';

describe('DatagridComponent', () => {
  let component: DataGridComponent<any>;
  let fixture: ComponentFixture<DataGridComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
