import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { PopularTagType } from 'src/app/shared/types/popularTag.type'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'
import { GetPopularTagsResponseInterface } from 'src/app/shared/modules/popularTags/types/getPopularTagsResponse.interface'

@Injectable()
export class PopularTagsService {
    constructor(private http: HttpClient) {}

    getPopularTags(): Observable<PopularTagType[]> {
        const url = environment.apiUrl + '/tags'
        return this.http.get(url).pipe(
            map((response: GetPopularTagsResponseInterface) => {
                return response.tags
            })
        )
    }
}
