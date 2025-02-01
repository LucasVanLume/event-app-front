import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsSharedModule } from 'src/app/shared/components/components-shared.module';
import { SignupPageComponent } from './presentation/pages/signup-page/signup-page.component';
import { SignupRepository } from './domain/repositories/signup.repository';
import { SignupRepositoryImpl } from './data/repositories/signup-impl.repository';
import { RegisterUserUseCase } from './domain/usecases/register-user.usecase';

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
  ],
  providers: [
    RegisterUserUseCase,
    { provide: SignupRepository, useClass: SignupRepositoryImpl }
  ]
})
export class SignupModule { }
