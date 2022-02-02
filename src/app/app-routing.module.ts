import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'datagrid',
    loadChildren: () =>
      import('./datagrid-component/datagrid.module').then(
        (m) => m.DataGridModule
      ),
  },
  {
    path: 'progress-indicator',
    loadChildren: () =>
      import('./progress-indicator-component/progress-indicator.module').then(
        (m) => m.ProgressIndicatorModule
      ),
  },
  {
    path: '',
    redirectTo: '/datagrid',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
