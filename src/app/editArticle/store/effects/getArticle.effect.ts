import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service'
import {
    getArticleAction,
    getArticleFailureAction,
    getArticleSuccessAction,
} from 'src/app/editArticle/store/actions/getArticleAction'

@Injectable()
export class GetArticleEffect {
    private getArticle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getArticleAction),
            switchMap(({ slug }) => {
                return this.sharedArticleService
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
        private actions$: Actions,
        private sharedArticleService: SharedArticleService
    ) {}
}
