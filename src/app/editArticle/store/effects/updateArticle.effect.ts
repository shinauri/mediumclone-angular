import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import { environment } from 'src/environments/environment'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { UpdateArticleService } from 'src/app/editArticle/services/updateArticle.service'
import {
    updateArticleAction,
    updateArticleFailureAction,
    updateArticleSuccessAction,
} from 'src/app/editArticle/store/actions/updateArticle.actions'

@Injectable()
export class UpdateArticleEffect {
    private redirectAfterUpdate$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(updateArticleSuccessAction),
                tap(({ article }) => {
                    this.router.navigate([
                        environment.endpoints.articles.article,
                        article.slug,
                    ])
                })
            ),
        { dispatch: false }
    )

    private updateArticle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateArticleAction),
            switchMap(({ articleInput, slug }) => {
                return this.updateArticleService
                    .updateArticle(slug, articleInput)
                    .pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
            })
        )
    )

    private successCallback = (article: ArticleInterface) => {
        return updateArticleSuccessAction({ article })
    }

    private errorCallback = (errorResponse: HttpErrorResponse) => {
        return of(
            updateArticleFailureAction({
                errors: errorResponse.error.errors,
            })
        )
    }

    constructor(
        private actions$: Actions,
        private updateArticleService: UpdateArticleService,
        private router: Router
    ) {}
}
