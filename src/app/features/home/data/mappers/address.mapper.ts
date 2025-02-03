import { Mapper } from 'src/app/core/utils/mapper';
import { AddressResponseModel } from '../models/response/address-response.model';
import { AddressEntity } from '../../domain/entities/address.entity';

export class AddressMapper extends Mapper<AddressResponseModel, AddressEntity> {
  mapFrom(param: AddressResponseModel): AddressEntity {
    return new AddressEntity(
      param.cep,
      param.street,
      param.city,
      param.neighborhood
    );
  }

  mapTo(param: AddressEntity): AddressResponseModel {
    return {
      cep: param.cep,
      state: '',
      city: param.cidade,
      neighborhood: param.bairro,
      street: param.rua,
      service: 'viacep'
    };
  }
}
