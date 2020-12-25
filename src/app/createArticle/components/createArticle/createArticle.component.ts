import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import {
    isSubmittingSelector,
    validationErrorsSelector,
} from 'src/app/createArticle/store/selectors'
import { createArticleAction } from 'src/app/createArticle/store/actions/createArticle.actions'

@Component({
    selector: 'mc-create-article',
    templateUrl: './createArticle.component.html',
    styleUrls: ['./createArticle.component.scss'],
})
export class CreateArticleComponent implements OnInit {
    initialValues: ArticleInputInterface = {
        title: '',
        description: '',
        body: '',
        tagList: [],
    }

    isSubmitting$: Observable<boolean>
    backendErrors$: Observable<BackendErrorsInterface | null>

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.initializeValues()
    }

    private initializeValues(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    }

    onSubmit(articleInput: ArticleInputInterface): void {
        this.store.dispatch(createArticleAction({ articleInput }))
    }
}
