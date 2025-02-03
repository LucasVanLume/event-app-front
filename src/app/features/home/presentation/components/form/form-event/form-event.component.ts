import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, switchMap, catchError, of, distinctUntilChanged, filter, take } from 'rxjs';
import { AddressEntity } from 'src/app/features/home/domain/entities/address.entity';
import { GetAddressUseCase } from 'src/app/features/home/domain/usecases/get-address.usecase';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent implements OnInit {

  eventForm: FormGroup;
  addressForm: FormGroup;

  constructor(
    private toastService: ToastrService,
    private fb: FormBuilder,
    private getAddressUseCase: GetAddressUseCase
  ) {
    this.addressForm = this.fb.group({
      cep: ['', [Validators.required, Validators.minLength(8)]],
      rua: [{ value: '', disabled: true }],
      cidade: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }],
    });

    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      isRemote: [false],
      theme: ['', [Validators.required]],
      address: this.addressForm,
    });
  }

  ngOnInit(): void {
    this.addressForm.get('cep')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(cep => cep.length === 8),
      switchMap(cep => this.getAddressUseCase.execute(cep).pipe(
        take(1),
        catchError(() => {
          return of(null);
        })
      ))
    ).subscribe(address => {
      if (address) {
        this.populateAddressFields(address);
      } else {
        this.toastService.error(`CEP ${this.addressForm.get('cep')?.value} não encontrado.`);
        this.clearAddressFields();
      }
    });
  }

  private populateAddressFields(address: AddressEntity): void {
    this.addressForm.patchValue({
      rua: address.rua,
      cidade: address.cidade,
      bairro: address.bairro
    });
  }

  private clearAddressFields(): void {
    this.addressForm.patchValue({
      rua: '',
      cidade: '',
      bairro: ''
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = {
        ...this.eventForm.getRawValue(),
        address: this.addressForm.getRawValue()
      };
  
      console.log(formData);
    } else {
      this.eventForm.markAllAsTouched();
    }
  }

  goBack(): void {
    // Implementar lógica de navegação
  }
}
