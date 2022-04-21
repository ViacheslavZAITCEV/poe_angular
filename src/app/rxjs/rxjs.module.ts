import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsRoutingModule } from './rxjs-routing.module';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CommuneDetailComponent } from './commune-detail/commune-detail.component';
import { ExercicesComponent } from './exercices/exercices.component';


@NgModule({
  declarations: [
    RxjsComponent,
    CommuneDetailComponent,
    ExercicesComponent
  ],
  imports: [
    CommonModule,
    RxjsRoutingModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    TableModule
  ]
})
export class RxjsModule { }
