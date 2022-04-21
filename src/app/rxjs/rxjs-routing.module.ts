import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsComponent } from './rxjs/rxjs.component';
import { CommuneDetailComponent } from './commune-detail/commune-detail.component';
import { ExercicesComponent } from './exercices/exercices.component';

const routes: Routes = [
  {
    path: '',
    component: RxjsComponent
  },
  {
    path: 'exercices',
    component: ExercicesComponent
  },
  {
    path: ':code',
    component: CommuneDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsRoutingModule { }
