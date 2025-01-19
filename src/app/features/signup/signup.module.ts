import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsSharedModule } from 'src/app/shared/components/components-shared.module';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

@NgModule({
  declarations: [
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    ComponentsSharedModule
  ]
})
export class SignupModule { }
