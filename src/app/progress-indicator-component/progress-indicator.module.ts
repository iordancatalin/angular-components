import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressIndicatorRoutingModule } from './progress-indicator-routing.module';
import { ProgressIndicatorComponent } from './progress-indicator/progress-indicator.component';
import { ProgressIndicatorPresentationComponent } from './progress-indicator-presentation/progress-indicator-presentation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProgressIndicatorComponent,
    ProgressIndicatorPresentationComponent,
  ],
  exports: [ProgressIndicatorComponent, ProgressIndicatorPresentationComponent],
  imports: [CommonModule, ProgressIndicatorRoutingModule, ReactiveFormsModule],
})
export class ProgressIndicatorModule {}
