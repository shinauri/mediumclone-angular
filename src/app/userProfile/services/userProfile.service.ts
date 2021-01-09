import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ProfileInterface } from 'src/app/shared/types/profile.interface'
import { GetUserProfileResponseInterface } from 'src/app/userProfile/types/getUserProfileResponse.interface'

@Injectable()
export class UserProfileService {
    constructor(private http: HttpClient) {}

    getUserProfile(url: string): Observable<ProfileInterface> {
        return this.http
            .get<GetUserProfileResponseInterface>(url)
            .pipe(
                map(
                    (response: GetUserProfileResponseInterface) =>
                        response.profile
                )
            )
    }
}
