import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment'
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface'
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface'

type AuthRequest = RegisterRequestInterface | LoginRequestInterface

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    auth(data: AuthRequest, url): Observable<CurrentUserInterface> {
        return this.fetchUser(url, data)
    }

    getCurrentUser(): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + environment.endpoints.auth.user
        return this.http.get(url).pipe(map(this.getUser))
    }

    private fetchUser(
        url: string,
        data: AuthRequest
    ): Observable<CurrentUserInterface> {
        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map(this.getUser))
    }

    private getUser(response: AuthResponseInterface): CurrentUserInterface {
        return response.user
    }
}
