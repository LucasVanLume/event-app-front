import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, switchMap, catchError, of, distinctUntilChanged, filter, take, forkJoin, timer } from 'rxjs';
import { AddressEntity } from 'src/app/features/home/domain/entities/address.entity';
import { EventEntity } from 'src/app/features/home/domain/entities/event.entity';
import { CreateEventUseCase } from 'src/app/features/home/domain/usecases/create-event.usecase';
import { GetAddressUseCase } from 'src/app/features/home/domain/usecases/get-address.usecase';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent implements OnInit {
  @Input() userId: string = "";
  @Output() eventCreated = new EventEmitter<EventEntity>();

  eventForm: FormGroup;
  addressForm: FormGroup;
  isLoadingCep: boolean = false;

  constructor(
    private toastService: ToastrService,
    private fb: FormBuilder,
    private getAddressUseCase: GetAddressUseCase,
    private createEventUseCase: CreateEventUseCase
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
      switchMap(cep => {
        this.isLoadingCep = true;

        return forkJoin({
          address: this.getAddressUseCase.execute(cep).pipe(
            take(1),
            catchError(() => of(null))
          ),
          delay: timer(1000)
        });
      })
    ).subscribe(({ address }) => {
      this.isLoadingCep = false;
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
  
      const startTime = formData.startTime;
      const endTime = formData.endTime;
  
      if (endTime <= startTime) {
        this.toastService.error('O horário de término deve ser posterior ao horário de início.');
        return;
      }
  
      const tel = formData.tel;
      if (!tel.match(/^\d{10,11}$/)) {
        this.toastService.error('O telefone deve conter 10 ou 11 dígitos.');
        return;
      }
  
      const eventEntity = new EventEntity(
        formData.id,
        formData.eventName,
        formData.eventDescription,
        formData.imgUrl,
        formData.eventUrl,
        formData.startTime,
        formData.endTime,
        formData.startDate,
        formData.endDate,
        formData.theme,
        formData.email,
        formData.tel,
        formData.isRemote,
        formData.address,
        this.userId
      );
  
      this.createEventUseCase.execute(eventEntity).subscribe({
        next: (createdEvent) => {
          console.log('Evento criado com sucesso:', createdEvent);
          this.eventCreated.emit(eventEntity);
        },
        error: (err) => {
          console.error('Erro ao criar evento:', err);
        },
      });
  
      console.log(formData);
    } else {
      this.eventForm.markAllAsTouched();
      this.toastService.error('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }

  goBack(): void {
    // Implementar lógica de navegação
  }
}
