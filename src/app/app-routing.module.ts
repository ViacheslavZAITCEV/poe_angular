import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExemplesComponent } from './exemples/exemples.component';
import { AuthGuard } from './services/auth-guard.service';
import { ExercicesComponent } from './exercices/exercices.component';
import { AuthComponent } from './auth/auth.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ErrorComponent } from './error/error.component';
import { RxjsModule } from './rxjs/rxjs.module';

const routes: Routes = [
  { path: 'exemples', component: ExemplesComponent },
  { path: 'exercices', canActivate: [AuthGuard], component: ExercicesComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'users', component: UserListComponent },
  { path: 'new', component: NewUserComponent },
  {
    path: 'rxjs',
    loadChildren: (): Promise<string | typeof RxjsModule> => import ('./rxjs/rxjs.module')
      .then(module => module.RxjsModule)
  },
  { path: '', component: ExemplesComponent },
  { path: 'not-found', component: ErrorComponent },
  { path: '**', redirectTo: 'not-found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    }
    )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
