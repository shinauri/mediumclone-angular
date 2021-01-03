import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { GetArticleResponseInterface } from 'src/app/shared/types/getArticleResponse.interface'

@Injectable()
export class AddToFavoritesService {
    constructor(private http: HttpClient) {}

    addToFavorites(url: string, data = {}): Observable<ArticleInterface> {
        return this.http.post(url, data).pipe(map(this.getArticle))
    }

    removeFromFavorites(url: string): Observable<ArticleInterface> {
        return this.http.delete(url).pipe(map(this.getArticle))
    }

    getArticle(response: GetArticleResponseInterface): ArticleInterface {
        return response.article
    }
}
