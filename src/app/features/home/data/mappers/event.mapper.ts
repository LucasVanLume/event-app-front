import { AddressEntity } from "../../domain/entities/address.entity";
import { EventEntity } from "../../domain/entities/event.entity";
import { AddressRequestModel } from "../models/request/address-request.model";
import { EventRequestModel } from "../models/request/event-request.model";
import { EventResponseModel } from "../models/response/event-response.model";
import { PageEventResponseModel } from "../models/response/page-event-response.model";


export class EventMapper {
  static toRequestModel(eventEntity: EventEntity): EventRequestModel {
    const { address, ...eventData } = eventEntity;
    
    const addressRequestModel = new AddressRequestModel(
      address.cep,
      address.cidade,
      address.bairro,
      address.rua
    );

    return new EventRequestModel(
      eventData.id,
      eventData.title,
      eventData.description,
      eventData.imgUrl,
      eventData.eventUrl,
      eventData.startTime,
      eventData.endTime,
      eventData.startDate,
      eventData.endDate,
      eventData.theme,
      eventData.email,
      eventData.phone,
      eventData.remote,
      addressRequestModel,
    );
  }

  static toEntity(eventResponse: EventResponseModel): EventEntity {
    const address = new AddressEntity("51000040", "Av. Paulista", "São Paulo", "Centro");
    const userId = eventResponse.userId;

    return new EventEntity(
      eventResponse.id,
      eventResponse.title,
      eventResponse.description,
      eventResponse.imgUrl,
      eventResponse.eventUrl,
      eventResponse.startTime,
      eventResponse.endTime,
      eventResponse.startDate,
      eventResponse.endDate,
      eventResponse.theme,
      eventResponse.email,
      eventResponse.phone,
      eventResponse.remote,
      address,
      userId
    );
  }

  static toPageEntity(pageEventResponse: PageEventResponseModel): { events: EventEntity[], totalPages: number, totalElements: number } {
    const events = pageEventResponse.events.map(eventResponse => this.toEntity(eventResponse));
    return {
      events,
      totalPages: pageEventResponse.totalPages,
      totalElements: pageEventResponse.totalElements
    };
  }
}
