import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { FeedService } from 'src/app/shared/modules/feed/services/feed.service'
import {
    getFeedAction,
    getFeedFailureAction,
    getFeedSuccessAction,
} from 'src/app/shared/modules/feed/store/actions/getFeed.action'
import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface'

@Injectable()
export class GetFeedEffect {
    private getFeed$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getFeedAction),
            switchMap(({ url }) => {
                return this.feedService
                    .getFeed(url)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (feed: GetFeedResponseInterface) => {
        return getFeedSuccessAction({ feed })
    }

    private errorCallback = () => {
        return of(getFeedFailureAction())
    }

    constructor(
        protected actions$: Actions,
        protected feedService: FeedService
    ) {}
}
