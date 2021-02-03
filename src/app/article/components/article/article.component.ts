import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'

import { ArticleInterface } from 'src/app/shared/types/article.interface'
import {
    articleSelector,
    errorSelector,
    isLoadingSelector,
} from 'src/app/article/store/selectors'
import { getArticleAction } from 'src/app/article/store/actions/getArticle.action'
import { deleteArticleAction } from 'src/app/article/store/actions/deleteArticle.action'
import { environment } from 'src/environments/environment'
import { IsService } from 'src/app/shared/services/is.service'

@Component({
    selector: 'mc-article',
    templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {
    slug: string
    article: ArticleInterface | null
    articleSubscription: Subscription
    isLoading$: Observable<boolean>
    error$: Observable<string | null>
    isAuthor$: Observable<boolean>

    constructor(
        private store: Store,
        private activatedRoute: ActivatedRoute,
        private is: IsService
    ) {}

    ngOnDestroy(): void {
        this.articleSubscription.unsubscribe()
    }

    ngOnInit(): void {
        this.initializeValues()
        this.initializeListeners()
        this.fetchData()
    }

    private initializeValues(): void {
        this.slug = this.activatedRoute.snapshot.paramMap.get('slug')
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.error$ = this.store.pipe(select(errorSelector))
        this.isAuthor$ = this.is.author()
    }

    private initializeListeners(): void {
        this.articleSubscription = this.store
            .pipe(select(articleSelector))
            .subscribe((article: ArticleInterface | null) => {
                this.article = article
            })
    }

    private fetchData(): void {
        this.store.dispatch(getArticleAction({ slug: this.slug }))
    }

    public deleteArticle(): void {
        this.store.dispatch(deleteArticleAction({ slug: this.slug }))
    }

    public getProfileUrl(userName: string): string {
        return `${environment.apiUrl}/profiles/${userName}/follow`
    }
}
