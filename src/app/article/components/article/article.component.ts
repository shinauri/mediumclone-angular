import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import {
    articleSelector,
    errorSelector,
    isLoadingSelector,
} from 'src/app/article/store/selectors'
import { currentUserSelector } from 'src/app/auth/store/selectors'
import { getArticleAction } from 'src/app/article/store/actions/getArticle.action'
import { deleteArticleAction } from 'src/app/article/store/actions/deleteArticle.action'

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

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

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
        this.isAuthor$ = this.isAuthor()
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

    private isAuthor(): Observable<boolean> {
        return combineLatest([
            this.store.pipe(select(articleSelector)),
            this.store.pipe(select(currentUserSelector)),
        ]).pipe(
            map(
                ([article, currentUser]: [
                    ArticleInterface | null,
                    CurrentUserInterface | null
                ]) => {
                    if (!article || !currentUser) {
                        return false
                    }
                    return article.author.username === currentUser.username
                }
            )
        )
    }
}
