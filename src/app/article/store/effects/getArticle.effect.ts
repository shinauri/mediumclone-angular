import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction,
} from 'src/app/article/store/actions/getArticle.action'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { ArticleService as ArticleSharedService } from 'src/app/shared/services/article.service'

@Injectable()
export class GetArticleEffect {
    private getArticle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getArticleAction),
            switchMap(({ slug }) => {
                return this.articleSharedService
                    .getArticle(slug)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (article: ArticleInterface) => {
        return getArticleSuccessAction({ article })
    }

    private errorCallback = () => {
        return of(getArticleFailureAction())
    }

    constructor(
        protected actions$: Actions,
        protected articleSharedService: ArticleSharedService
    ) {}
}
