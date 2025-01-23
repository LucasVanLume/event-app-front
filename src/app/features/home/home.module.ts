import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ComponentsSharedModule } from 'src/app/shared/components/components-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,

    ComponentsSharedModule
  ]
})
export class HomeModule { }
