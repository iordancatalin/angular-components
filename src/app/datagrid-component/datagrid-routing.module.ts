import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridPresentationComponent } from './datagrid-presentation/datagrid-presentation.component';

const routes: Routes = [
  {
    path: '',
    component: DataGridPresentationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatagridRoutingModule {}
