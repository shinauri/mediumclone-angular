import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import {
    articleSelector,
    isLoadingSelector,
    isSubmittingSelector,
    validationErrorsSelector,
} from 'src/app/editArticle/store/selectors'
import { getArticleAction } from 'src/app/editArticle/store/actions/getArticleAction'
import { filter, map } from 'rxjs/operators'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { updateArticleAction } from 'src/app/editArticle/store/actions/updateArticle.actions'

@Component({
    selector: 'mc-edit-article',
    templateUrl: './editArticle.component.html',
    styleUrls: ['./editArticle.component.scss'],
})
export class EditArticleComponent implements OnInit {
    slug: string

    isSubmitting$: Observable<boolean>
    isLoading$: Observable<boolean>
    initialValues$: Observable<ArticleInputInterface>
    backendErrors$: Observable<BackendErrorsInterface | null>

    constructor(private store: Store, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.initializeValues()
        this.fetchData()
    }

    private initializeValues(): void {
        this.slug = this.activatedRoute.snapshot.paramMap.get('slug')
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.initialValues$ = this.store.pipe(
            select(articleSelector),
            filter(Boolean),
            map((article: ArticleInterface) => {
                return {
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: article.tagList,
                }
            })
        )
    }

    private fetchData(): void {
        this.store.dispatch(getArticleAction({ slug: this.slug }))
    }

    onSubmit(articleInput: ArticleInputInterface): void {
        this.store.dispatch(
            updateArticleAction({ articleInput, slug: this.slug })
        )
    }
}
