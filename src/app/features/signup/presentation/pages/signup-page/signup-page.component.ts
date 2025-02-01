import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserUseCase } from '../../../domain/usecases/register-user.usecase';
import { UserSignupEntity } from '../../../domain/entities/user-signup.entity';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private registerUserUseCase: RegisterUserUseCase,
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  submit(){
    if(this.signupForm.valid) {
      const userSignupEntity = new UserSignupEntity(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.passwordConfirm
      );
      this.registerUserUseCase.execute(userSignupEntity).subscribe({
        next: () => {
          console.log("success");
          this.toastService.success('Cadastro realizado com sucesso.');
          this.navigate();
        },
        error: () => {
          console.log("error");
          this.toastService.error('Credenciais inválidas, tente novamente.');
        }
      });
    } else {
      if (
        this.signupForm.get('name')?.value === '' ||
        this.signupForm.get('email')?.value === '' ||
        this.signupForm.get('password')?.value === '' ||
        this.signupForm.get('passwordConfirm')?.value === ''
      ) {
        this.toastService.error('Todos os campos são obrigatórios.');
      } else if (this.signupForm.get('email')?.invalid) {
        this.toastService.error('Por favor, insira um email válido.');
      } else if (this.signupForm.get('password')?.invalid) {
        this.toastService.error('A senha deve conter pelo menos 6 caracteres.');
      } else if (this.signupForm.get('passwordConfirm')?.value !== this.signupForm.get('password')?.value) {
        this.toastService.error('As senhas não coincidem.');
      }
    }
  }

  navigate() {
    this.router.navigate(["login"])
  }
}
