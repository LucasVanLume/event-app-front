import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ComponentsSharedModule } from 'src/app/shared/components/components-shared.module';
import { LoginUseCase } from './domain/usecases/login.usecase';
import { LoginRepository } from './domain/repositories/login.repository';
import { LoginRepositoryImpl } from './data/repositories/login-impl.repository';

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    ComponentsSharedModule
  ],
  providers: [
    LoginService,
    LoginUseCase,
    { provide: LoginRepository, useClass: LoginRepositoryImpl }
  ]
})
export class LoginModule { }
