export class AddressRequestModel {
    cep: string;
    city: string;
    neighborhood: string;
    street: string;
  
    constructor(
        cep: string,
        city: string,
        neighborhood: string,
        street: string,
    ) {
      this.cep = cep;
      this.city = city;
      this.neighborhood = neighborhood;
      this.street = street;
    }
  }
  