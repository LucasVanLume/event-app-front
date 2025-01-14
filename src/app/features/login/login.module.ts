import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [
    LoginPageComponent,
    LoginComponentComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
})
export class LoginModule { }
