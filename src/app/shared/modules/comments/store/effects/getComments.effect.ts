import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
    getCommentsAction,
    getCommentsFailureAction,
    getCommentsSuccessAction,
} from 'src/app/shared/modules/comments/store/actions/getComments.aections'
import { CommentsService } from 'src/app/shared/modules/comments/services/comments.service'
import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class GetCommentsEffect {
    private getComments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCommentsAction),
            switchMap(({ url }) => {
                return this.commentsService
                    .getComments(url)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (comments: CommentInterface[]) => {
        return getCommentsSuccessAction({ comments })
    }

    private errorCallback = (errorResponse: HttpErrorResponse) => {
        return of(
            getCommentsFailureAction({
                errors: errorResponse.error,
            })
        )
    }

    constructor(
        private actions$: Actions,
        private commentsService: CommentsService
    ) {}
}
