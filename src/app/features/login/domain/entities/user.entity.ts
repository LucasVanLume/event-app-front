interface UserEntityParams {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    token?: string;
}

export class UserEntity {
    id: string;
    username: string;
    email: string;
    password: string;
    token: string;

    constructor(params: UserEntityParams = {}) {
        this.id = params.id || '';
        this.username = params.username || '';
        this.email = params.email || '';
        this.password = params.password || '';
        this.token = params.token || '';
    }
}