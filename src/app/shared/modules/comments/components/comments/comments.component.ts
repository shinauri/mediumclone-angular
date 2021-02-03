import { Component, Input, OnDestroy, OnInit } from '@angular/core'

import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { CommentInputInterface } from 'src/app/shared/modules/comments/components/commentForm/types/commentInput.interface'
import { Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { currentUserSelector } from 'src/app/auth/store/selectors'
import { filter, skipWhile, tap } from 'rxjs/operators'

import { getCommentsAction } from 'src/app/shared/modules/comments/store/actions/getComments.aections'
import { environment } from 'src/environments/environment'
import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'
import {
    isLoadingCommentsSelector,
    commentsSelector,
    getCommentsErrorSelector,
    isLoadingDeleteCommentSelector,
    deleteCommentSelector,
    deleteCommentErrorSelector,
} from 'src/app/shared/modules/comments/store/selectors'
import { deleteCommentAction } from 'src/app/shared/modules/comments/store/actions/deleteComment.action'
import { postCommentAction } from 'src/app/shared/modules/comments/store/actions/postComment.actions'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'

@Component({
    selector: 'mc-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
    @Input('article') articleInput: ArticleInterface

    isLoadingComments$: Observable<boolean>
    getCommentsError$: Observable<BackendErrorsInterface | null>
    comments$: Observable<CommentInterface[] | null>
    deletedCommentsIds$: Observable<number[]>
    deleteCommentsErrors$: Observable<BackendErrorsInterface[]>

    currentUser: CurrentUserInterface
    currentUserSubscription: Subscription

    constructor(private store: Store) {}

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe()
    }

    ngOnInit(): void {
        this.fetchComments()
        this.initializeListeners()
        this.initializeValues()
    }

    private fetchComments(): void {
        const url = `${environment.apiUrl}/articles/${this.articleInput.slug}/comments`
        this.store.dispatch(getCommentsAction({ url }))
    }

    private initializeListeners(): void {
        this.currentUserSubscription = this.store
            .pipe(select(currentUserSelector), filter(Boolean))
            .subscribe((currentUser: CurrentUserInterface) => {
                this.currentUser = currentUser
            })
    }

    private initializeValues(): void {
        this.initializeGetCommentsValues()
        this.initializeDeleteCommentValues()
    }

    private initializeGetCommentsValues(): void {
        this.isLoadingComments$ = this.store.pipe(
            select(isLoadingCommentsSelector)
        )
        this.getCommentsError$ = this.store.pipe(
            select(getCommentsErrorSelector)
        )
        this.comments$ = this.store.pipe(select(commentsSelector))
    }

    private initializeDeleteCommentValues(): void {
        this.deletedCommentsIds$ = this.store.pipe(
            select(deleteCommentSelector)
        )

        this.deleteCommentsErrors$ = this.store.pipe(
            select(deleteCommentErrorSelector)
        )
    }

    submitComment(comment: CommentInputInterface): void {
        const url = `${environment.apiUrl}/articles/${this.articleInput.slug}/comments`
        this.store.dispatch(postCommentAction({ url, comment }))
    }

    removeComment(comment: CommentInterface): void {
        const url = `${environment.apiUrl}/articles/${this.articleInput.slug}/comments/${comment.id}`
        this.store.dispatch(deleteCommentAction({ url, comment }))
    }
}
