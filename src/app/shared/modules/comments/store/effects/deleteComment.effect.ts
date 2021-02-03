import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
    catchError,
    concatMap,
    delay,
    map,
    switchMap,
    tap,
} from 'rxjs/operators'
import { of } from 'rxjs'

import {
    deleteCommentAction,
    deleteCommentFailureAction,
    deleteCommentSuccessAction,
} from 'src/app/shared/modules/comments/store/actions/deleteComment.action'
import { CommentsService } from 'src/app/shared/modules/comments/services/comments.service'
import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'

@Injectable()
export class DeleteCommentEffect {
    private deleteComment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCommentAction),
            concatMap(({ url, comment }) => {
                return this.commentsService
                    .delete(url)
                    .pipe(
                        delay(300),
                        map(this.successCallback(comment.id)),
                        catchError(this.errorCallback(comment.id))
                    )
            })
        )
    )

    private successCallback = (commentId: number) => {
        return (responseComment: CommentInterface) => {
            return deleteCommentSuccessAction({ commentId })
        }
    }

    private errorCallback = (commentId: number) => {
        return (errorResponse: HttpErrorResponse) => {
            return of(
                deleteCommentFailureAction({
                    errors: { ...errorResponse.error, commentId },
                })
            )
        }
    }

    constructor(
        private actions$: Actions,
        private commentsService: CommentsService
    ) {}
}
