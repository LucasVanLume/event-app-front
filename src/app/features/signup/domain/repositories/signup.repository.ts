import { Observable } from 'rxjs';
import { UserSignupEntity } from '../entities/user-signup.entity';

export abstract class SignupRepository {
    abstract register(params: { userSignupEntity: UserSignupEntity }): Observable<void>;
}