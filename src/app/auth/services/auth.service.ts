import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface'
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface'
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface'

type AuthRequest = RegisterRequestInterface | LoginRequestInterface

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    private static getUser(
        response: AuthResponseInterface
    ): CurrentUserInterface {
        return response.user
    }

    auth(data: AuthRequest, url): Observable<CurrentUserInterface> {
        return this.fetchUser(url, data)
    }

    getCurrentUser(url): Observable<CurrentUserInterface> {
        return this.http.get(url).pipe(map(AuthService.getUser))
    }

    updateCurrentUser(
        currentUserInput: CurrentUserInputInterface,
        url: string
    ): Observable<CurrentUserInterface> {
        return this.http
            .put(url, currentUserInput)
            .pipe(map(AuthService.getUser))
    }

    private fetchUser(
        url: string,
        data: AuthRequest
    ): Observable<CurrentUserInterface> {
        return this.http
            .post<AuthResponseInterface>(url, data)
            .pipe(map(AuthService.getUser))
    }
}
