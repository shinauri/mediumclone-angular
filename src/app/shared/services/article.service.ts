import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment'
import { GetArticleResponseInterface } from 'src/app/shared/types/getArticleResponse.interface'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { map } from 'rxjs/operators'

@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) {}

    getArticle(slug: string): Observable<ArticleInterface> {
        const fullUrl = `${environment.apiUrl}${environment.endpoints.articles.article}/${slug}`
        return this.http
            .get<GetArticleResponseInterface>(fullUrl)
            .pipe(
                map((response: GetArticleResponseInterface) => response.article)
            )
    }
}
