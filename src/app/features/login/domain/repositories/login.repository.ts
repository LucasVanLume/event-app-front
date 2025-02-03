import { Observable } from 'rxjs';
import { UserEntity } from '../entities/user.entity';

export abstract class LoginRepository {
    abstract login(params: { email: string, password: string }): Observable<UserEntity>;
    //abstract getUserProfile(params: { userId: string }): Observable<UserEntity>;
}