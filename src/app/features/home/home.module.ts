import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './presentation/page/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ComponentsSharedModule } from 'src/app/shared/components/components-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './presentation/components/header/header.component';
import { FormEventComponent } from './presentation/components/form/form-event/form-event.component';
import { AppPhoneMaskDirective } from 'src/app/shared/utils/mask/app-phone-mask.directive';
import { AddressFormComponent } from './presentation/components/form/address-form/address-form.component';
import { GetAddressUseCase } from './domain/usecases/get-address.usecase';
import { HomeRepository } from './domain/repositories/home.repository';
import { HomeRepositoryImpl } from './data/repositories/home-impl.repository';
import { CreateEventUseCase } from './domain/usecases/create-event.usecase';
import { EventsListComponent } from './presentation/components/events-list/events-list.component';
import { GetAllEventsUseCase } from './domain/usecases/get-all-events.usecase';
import { EventViewComponent } from './presentation/components/event-view/event-view.component.ts.component';
import { GetFilterEventsUseCase } from './domain/usecases/get-filter-events.usecase';



@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    FormEventComponent,
    AddressFormComponent,
    EventsListComponent,
    EventViewComponent
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
    AppPhoneMaskDirective,

    GetAddressUseCase,
    CreateEventUseCase,
    GetAllEventsUseCase,
    GetFilterEventsUseCase,
    { provide: HomeRepository, useClass: HomeRepositoryImpl }
  ],
})
export class HomeModule { }
