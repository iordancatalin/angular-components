import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressIndicatorPresentationComponent } from './progress-indicator-presentation/progress-indicator-presentation.component';

const routes: Routes = [
  {
    path: '',
    component: ProgressIndicatorPresentationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressIndicatorRoutingModule {}
