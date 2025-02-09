import { EventResponseModel } from "./event-response.model";

export class PageEventResponseModel {
    constructor(
      public events: EventResponseModel[],
      public totalElements: number,
      public totalPages: number
    ) {}
}