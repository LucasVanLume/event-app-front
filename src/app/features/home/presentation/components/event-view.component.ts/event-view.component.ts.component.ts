import { Component, Input } from '@angular/core';
import { EventEntity } from '../../../domain/entities/event.entity';
import { AddressEntity } from '../../../domain/entities/address.entity';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.ts.component.html',
  styleUrls: ['./event-view.component.ts.component.scss']
})
export class EventViewComponent {
  //@Input() event: EventEntity;
  event: EventEntity; 
  
  constructor() {
    this.event = new EventEntity(
      '',
      'Workshop de Desenvolvimento Web',
      'Aprenda as últimas tecnologias web neste workshop intensivo',
      '',
      '',
      '14:00',
      '18:00',
      '2024-02-15',
      'Tecnologia',
      'workshop@exemplo.com',
      '(11) 99999-9999',
      true,
      new AddressEntity('01234-567', 'Rua das Flores, 123', 'São Paulo', 'Centro'),
      '',
    );
  }
}
