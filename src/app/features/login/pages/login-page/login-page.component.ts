import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUseCase } from '../../domain/usecases/login.usecase';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm!: FormGroup;

  constructor( 
    private router: Router,
    private loginUseCase: LoginUseCase,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.loginUseCase.execute({ email: this.loginForm.value.email, password: this.loginForm.value.password }).subscribe({
        next: () => {
          console.log("success");
          this.toastService.success("Login realizado com sucesso!");
          this.router.navigate(["home"]);
        },
        error: (error) => {
          console.log("error");
          this.toastService.error("Credenciais inválidas, tente novamente.");
        }
      });
      const { email, password } = this.loginForm.value;
      console.log(email, password);
    } else {
      if (this.loginForm.get('email')?.value === '' || this.loginForm.get('password')?.value === '') {
        this.toastService.error('Os campos de email e senha são obrigatórios.');
      } else if (this.loginForm.get('email')?.invalid) {
        this.toastService.error("Por favor, insira um email válido.");
      }
    }
  }

  navigate() {
    this.router.navigate(["signup"]);
  }

}
