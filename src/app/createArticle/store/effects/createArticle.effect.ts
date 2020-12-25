import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
    createArticleAction,
    createArticleFailureAction,
    createArticleSuccessAction,
} from 'src/app/createArticle/store/actions/createArticle.actions'

import { environment } from 'src/environments/environment'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { CreateArticleService } from 'src/app/createArticle/services/createArticle.service'

@Injectable()
export class CreateArticleEffect {
    private redirectAfterCreate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(createArticleSuccessAction),
                tap(({ article }) => {
                    this.router.navigate([
                        environment.endpoints.articles.article,
                        article.slug,
                    ])
                })
            ),
        { dispatch: false }
    )

    private createArticle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createArticleAction),
            switchMap(({ articleInput }) => {
                return this.createArticleService
                    .createArticle(articleInput)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (article: ArticleInterface) => {
        return createArticleSuccessAction({ article })
    }

    private errorCallback = (errorResponse: HttpErrorResponse) => {
        return of(
            createArticleFailureAction({
                errors: errorResponse.error.errors,
            })
        )
    }

    constructor(
        private actions$: Actions,
        private createArticleService: CreateArticleService,
        private router: Router
    ) {}
}
