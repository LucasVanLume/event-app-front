export class EventRequestModel {
    id: string;
    title: string;
    description: string;
    imgUrl: string;
    eventUrl: string;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    theme: string;
    email: string;
    phone: string;
    remote: boolean;
  
    constructor(
      id: string,
      title: string,
      description: string,
      imgUrl: string,
      eventUrl: string,
      startTime: string,
      endTime: string,
      startDate: string,
      endDate: string,
      theme: string,
      email: string,
      phone: string,
      remote: boolean
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.imgUrl = imgUrl;
      this.eventUrl = eventUrl;
      this.startTime = startTime;
      this.endTime = endTime;
      this.startDate = startDate;
      this.endDate = endDate;
      this.theme = theme;
      this.email = email;
      this.phone = phone;
      this.remote = remote;
    }
  }
  