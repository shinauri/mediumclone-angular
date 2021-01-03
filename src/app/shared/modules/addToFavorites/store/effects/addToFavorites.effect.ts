import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'

import { AddToFavoritesService } from 'src/app/shared/modules/addToFavorites/services/addToFavorites.service'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import {
    addToFavoritesAction,
    addToFavoritesFailureAction,
    addToFavoritesSuccessAction,
} from 'src/app/shared/modules/addToFavorites/store/actions/addToFavorites.action'
import { environment } from 'src/environments/environment'

class Api {
    url(): string {
        return ''
    }
}

@Injectable()
export class AddToFavoritesEffect {
    private addToFavorites$: Observable<Action | unknown>

    constructor(
        protected actions$: Actions,
        protected addToFavoritesService: AddToFavoritesService
    ) {
        this.addToFavorites$ = this.addToFavorites()
    }

    private addToFavorites(): Observable<Action | unknown> {
        return createEffect(() =>
            this.actions$.pipe(
                ofType(addToFavoritesAction),
                switchMap(({ isFavorited, slug }) => {
                    const url = `${environment.apiUrl}/articles/${slug}/favorite`
                    const article$ = isFavorited
                        ? this.addToFavoritesService.removeFromFavorites(url)
                        : this.addToFavoritesService.addToFavorites(url)

                    return article$.pipe(
                        map(this.successCallback),
                        catchError(this.errorCallback)
                    )
                })
            )
        )
    }

    private successCallback = (article: ArticleInterface) => {
        return addToFavoritesSuccessAction({ article })
    }

    private errorCallback = () => {
        return of(addToFavoritesFailureAction())
    }
}
