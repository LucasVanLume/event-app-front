import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../domain/usecases/login.usecase';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm!: FormGroup;

  constructor( 
    private router: Router,
    private loginUseCase: LoginUseCase
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    // if (this.loginForm.valid) {
      this.loginUseCase.execute({ email: this.loginForm.value.email, password: this.loginForm.value.password }).subscribe({
        next: () => {
          console.log("success");
        },
        error: (error) => {
          console.log("error");
        }
      });
      const { email, password } = this.loginForm.value;
      console.log(email, password);
    // }
  }

  navigate() {
    this.router.navigate(["signup"]);
  }

}
