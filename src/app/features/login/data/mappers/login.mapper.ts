import { Mapper } from 'src/app/core/utils/mapper';
import { UserEntity } from '../../domain/entities/user.entity';
import { LoginResponse } from 'src/app/shared/types/login-response.type';

export class LoginMapper extends Mapper<LoginResponse, UserEntity> {
  mapFrom(param: LoginResponse): UserEntity {
    return new UserEntity({ username: param.name, token: param.token, id: param.id });
  }

  mapTo(param: UserEntity): LoginResponse {
    return {
      id: param.id,
      name: param.username,
      email: param.email,
      token: param.token
    };
  }
}