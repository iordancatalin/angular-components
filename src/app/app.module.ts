import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataGridModule } from './datagrid-component/datagrid.module';
import { ProgressIndicatorModule } from './progress-indicator-component/progress-indicator.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataGridModule,
    ProgressIndicatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
