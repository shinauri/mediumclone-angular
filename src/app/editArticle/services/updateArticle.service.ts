import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { environment } from 'src/environments/environment'
import { SaveArticleResponseInterface } from 'src/app/shared/types/saveArticleResponse.interface'

@Injectable()
export class UpdateArticleService {
    constructor(private http: HttpClient) {}

    updateArticle(
        slug: string,
        articleInput: ArticleInputInterface
    ): Observable<ArticleInterface> {
        const url = `${environment.apiUrl}${environment.endpoints.articles.article}/${slug}`
        return this.http
            .put<SaveArticleResponseInterface>(url, articleInput)
            .pipe(
                map(
                    (response: SaveArticleResponseInterface) => response.article
                )
            )
    }
}
