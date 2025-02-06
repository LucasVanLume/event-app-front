export class EventResponseModel {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imgUrl: string,
    public eventUrl: string,
    public startTime: string,
    public endTime: string,
    public date: string,
    public theme: string,
    public email: string,
    public phone: string,
    public remote: boolean,
    public userId: string
  ) {}
}
