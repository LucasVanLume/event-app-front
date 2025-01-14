import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './features/login/pages/login-page/login-page.component';
import { LoginModule } from './features/login/login.module';

const routes: Routes = [
  // {
  //   path: '',
  //   component: EventPageComponent,
  //   //loadChildren: () => import('./features/event/event.module').then((m) => m.EventModule),
  // },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
