import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'

import { FollowService } from 'src/app/shared/modules/follow/services/follow.service'
import { ProfileInterface } from 'src/app/shared/types/profile.interface'
import {
    followAction,
    followFailureAction,
    followSuccessAction,
} from 'src/app/shared/modules/follow/store/actions/follow.action'

@Injectable()
export class FollowEffect {
    private addToFavorites$: Observable<Action | unknown>

    constructor(
        protected actions$: Actions,
        protected followService: FollowService
    ) {
        this.addToFavorites$ = this.addToFavorites()
    }

    private addToFavorites(): Observable<Action | unknown> {
        return createEffect(() =>
            this.actions$.pipe(
                ofType(followAction),
                switchMap(({ isFollowed, url }) => {
                    const profile$ = isFollowed
                        ? this.followService.unFollow(url)
                        : this.followService.follow(url)

                    return profile$.pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
                })
            )
        )
    }

    private successCallback = (profile: ProfileInterface) => {
        return followSuccessAction({ profile })
    }

    private errorCallback = () => {
        return of(followFailureAction())
    }
}
