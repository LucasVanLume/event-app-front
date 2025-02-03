export class AddressEntity {
    cep: string;
    rua: string;
    cidade: string;
    bairro: string;
  
    constructor(cep: string, rua: string, cidade: string, bairro: string) {
      this.cep = cep;
      this.rua = rua;
      this.cidade = cidade;
      this.bairro = bairro;
    }
}