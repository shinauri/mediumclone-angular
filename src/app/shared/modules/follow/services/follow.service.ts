import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { GetUserProfileResponseInterface } from 'src/app/shared/types/getUserProfileResponse.interface'
import { ProfileInterface } from 'src/app/shared/types/profile.interface'

@Injectable()
export class FollowService {
    constructor(private http: HttpClient) {}

    follow(url: string, data = {}): Observable<ProfileInterface> {
        return this.http.post(url, data).pipe(map(this.getUserProfile))
    }

    unFollow(url: string): Observable<ProfileInterface> {
        return this.http.delete(url).pipe(map(this.getUserProfile))
    }

    getUserProfile(
        response: GetUserProfileResponseInterface
    ): ProfileInterface {
        return response.profile
    }
}
