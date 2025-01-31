import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ComponentsSharedModule } from 'src/app/shared/components/components-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FormEventComponent } from './components/form-event/form-event/form-event.component';
import { AppPhoneMaskDirective } from 'src/app/shared/utils/mask/app-phone-mask.directive';



@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    FormEventComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    ComponentsSharedModule
  ],
  providers: [
    AppPhoneMaskDirective
  ],
})
export class HomeModule { }
