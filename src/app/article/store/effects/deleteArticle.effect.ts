import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
    deleteArticleAction,
    deleteArticleFailureAction,
    deleteArticleSuccessAction,
} from 'src/app/article/store/actions/deleteArticle.action'
import { ArticleService } from 'src/app/article/services/article.service'

@Injectable()
export class DeleteArticleEffect {
    private redirectAfterDelete$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(deleteArticleSuccessAction),
                tap(() => {
                    this.router.navigate(['/'])
                })
            ),
        { dispatch: false }
    )

    private deleteArticle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteArticleAction),
            switchMap(({ slug }) => {
                return this.articleService
                    .deleteArticle(slug)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = () => {
        return deleteArticleSuccessAction()
    }

    private errorCallback = () => {
        return of(deleteArticleFailureAction())
    }

    constructor(
        protected router: Router,
        protected actions$: Actions,
        protected articleService: ArticleService
    ) {}
}
