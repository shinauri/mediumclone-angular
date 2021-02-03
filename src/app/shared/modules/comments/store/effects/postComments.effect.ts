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
import {
    postCommentAction,
    postCommentFailureAction,
    postCommentSuccessAction,
} from 'src/app/shared/modules/comments/store/actions/postComment.actions'

@Injectable()
export class PostCommentsEffect {
    private postComments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(postCommentAction),
            switchMap(({ url, comment }) => {
                console.log(comment)
                return this.commentsService
                    .create(url, comment)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (comment: CommentInterface) => {
        return postCommentSuccessAction({ comment })
    }

    private errorCallback = (errorResponse: HttpErrorResponse) => {
        return of(
            postCommentFailureAction({
                errors: errorResponse.error,
            })
        )
    }

    constructor(
        private actions$: Actions,
        private commentsService: CommentsService
    ) {}
}
