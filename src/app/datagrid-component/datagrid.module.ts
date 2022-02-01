import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridPresentationComponent } from './datagrid-presentation/datagrid-presentation.component';
import { DatagridRoutingModule } from './datagrid-routing.module';
import { ColumnComponent } from './datagrid/column/column.component';
import { DataGridComponent } from './datagrid/datagrid.component';
import { DatasourceService } from './services/datasource.service';
import { SortService } from './services/sort.service';

@NgModule({
  declarations: [
    DataGridComponent,
    ColumnComponent,
    DataGridPresentationComponent,
  ],
  exports: [DataGridComponent, ColumnComponent, DataGridPresentationComponent],
  imports: [
    CommonModule,
    DatagridRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatasourceService, SortService],
})
export class DataGridModule {}
