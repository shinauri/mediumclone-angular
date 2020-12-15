import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface'
import { PopularTagsService } from 'src/app/shared/modules/popularTags/services/popularTags.service'
import {
    getPopularTagsAction,
    getPopularTagsFailureAction,
    getPopularTagsSuccessAction,
} from 'src/app/shared/modules/popularTags/store/actions/getPopularTags.action'
import { PopularTagType } from 'src/app/shared/types/popularTag.type'

@Injectable()
export class GetPopularTagsEffect {
    private getPopularTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getPopularTagsAction),
            switchMap(() => {
                return this.popularTagsService
                    .getPopularTags()
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (popularTags: PopularTagType[]) => {
        return getPopularTagsSuccessAction({ popularTags })
    }

    private errorCallback = () => {
        return of(getPopularTagsFailureAction())
    }

    constructor(
        protected actions$: Actions,
        protected popularTagsService: PopularTagsService
    ) {}
}
