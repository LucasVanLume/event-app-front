import { Observable } from 'rxjs';
import { UserEntity } from '../entities/user.entity';

export abstract class LoginRepository {
    abstract login(params: { email: string, password: string }): Observable<UserEntity>;
    abstract register(params: { username: string, password: string, email: string }): Observable<UserEntity>;
    //abstract getUserProfile(params: { userId: string }): Observable<UserEntity>;
}