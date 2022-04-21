import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TestBindingComponent } from './test-binding/test-binding.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './directives/highlight.directive';
import { TimerDirective } from './directives/timer.directive';
import { CbPipe } from './pipes/cb.pipe';
import { OrganeItemComponent } from './organe-item/organe-item.component';
import { AddComponent } from './add/add.component';
import { PanierComponent } from './panier/panier.component';
import { PanierService } from './services/panier.service';
import { AuthComponent } from './auth/auth.component';
import { ExemplesComponent } from './exemples/exemples.component';
import { ExercicesComponent } from './exercices/exercices.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './services/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { NewUserComponent } from './new-user/new-user.component';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestBindingComponent,
    HighlightDirective,
    TimerDirective,
    CbPipe,
    OrganeItemComponent,
    AddComponent,
    PanierComponent,
    AuthComponent,
    ExemplesComponent,
    ExercicesComponent,
    ErrorComponent,
    UserListComponent,
    NewUserComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PanelModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        // RouterModule.forRoot(appRoutes),
        ButtonModule,
        HttpClientModule,
        ProgressSpinnerModule
    ],
  providers: [PanierService, AuthGuard, AuthService, UserService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
