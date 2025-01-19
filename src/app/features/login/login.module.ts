import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginContainerComponent } from './components/login-container-component/login-container-component.component';
import { PrimaryInputComponent } from './components/primary-input-component/primary-input-component.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    LoginContainerComponent,
    PrimaryInputComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
