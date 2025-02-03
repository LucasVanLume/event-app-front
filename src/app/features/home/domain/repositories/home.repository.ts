import { Observable } from 'rxjs';
import { AddressEntity } from '../entities/address.entity';

export abstract class HomeRepository {
  abstract getAddressByCep(params: { cep: string }): Observable<AddressEntity>;
}
