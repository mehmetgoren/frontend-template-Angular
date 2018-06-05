import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { Credentials } from '../models/custom.models';
import { UserLocal } from '../models/entities';

@Injectable()
export class UnauthorizedService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
        this.auth = false;
    }

    // signInByCredentials(credentials: Credentials): Observable<string> {
    //     return this.postSingle("/api/Unauthorized/SignInByCredentials", credentials);
    // }

    login(credentials: Credentials): Observable<UserLocal> {
        return this.postSingle("/api/Unauthorized/Login", credentials);
    }
}

