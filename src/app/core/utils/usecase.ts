import { Observable } from 'rxjs';

export abstract class UseCase<T, R> {
    abstract execute(params: T): Observable<R>;
}