import { AddressEntity } from "../../domain/entities/address.entity";
import { EventEntity } from "../../domain/entities/event.entity";
import { EventRequestModel } from "../models/request/event-request.model";


export class EventMapper {
  static toRequestModel(eventEntity: EventEntity): EventRequestModel {
    const { address, ...eventData } = eventEntity; // Desestrutura o address, removendo-o do objeto
    return new EventRequestModel(
      eventData.id,
      eventData.title,
      eventData.description,
      eventData.imgUrl,
      eventData.eventUrl,
      eventData.startTime,
      eventData.endTime,
      eventData.date,
      eventData.theme,
      eventData.email,
      eventData.phone,
      eventData.remote
    );
  }

  static toEntity(eventRequest: EventRequestModel): EventEntity {
    const address = new AddressEntity("", "", "", "");

    return new EventEntity(
      eventRequest.id,
      eventRequest.title,
      eventRequest.description,
      eventRequest.imgUrl,
      eventRequest.eventUrl,
      eventRequest.startTime,
      eventRequest.endTime,
      eventRequest.date,
      eventRequest.theme,
      eventRequest.email,
      eventRequest.phone,
      eventRequest.remote,
      address
    );
  }
}
