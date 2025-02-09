import { AddressEntity } from "../../domain/entities/address.entity";
import { EventEntity } from "../../domain/entities/event.entity";
import { EventRequestModel } from "../models/request/event-request.model";
import { EventResponseModel } from "../models/response/event-response.model";


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
      eventData.startDate,
      eventData.endDate,
      eventData.theme,
      eventData.email,
      eventData.phone,
      eventData.remote
    );
  }

  static toEntity(eventResponse: EventResponseModel): EventEntity {
    const address = new AddressEntity("", "", "", "");
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
}
