import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryInputComponent } from './primary-input-component/primary-input-component.component';
import { LoginContainerComponent } from './login-container-component/login-container-component.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    PrimaryInputComponent,
    LoginContainerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PrimaryInputComponent,
    LoginContainerComponent,
  ]
})
export class ComponentsSharedModule { }
