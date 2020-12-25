import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'mc-article-form',
    templateUrl: './articleForm.component.html',
    styleUrls: ['./articleForm.component.scss'],
})
export class ArticleFormComponent implements OnInit {
    @Input('initialValues') initialValuesInput: ArticleInputInterface
    @Input('isSubmitting') isSubmittingInput: boolean
    @Input('errors') errorsInput: BackendErrorsInterface | null

    @Output('articleSubmit')
    articleSubmitEvent = new EventEmitter<ArticleInputInterface>()

    form: FormGroup

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm()
    }

    private initializeForm(): void {
        const minLength = 3
        this.form = this.fb.group({
            title: [
                this.initialValuesInput.title,
                [Validators.required, Validators.minLength(minLength)],
            ],
            description: [
                this.initialValuesInput.description,
                [Validators.required, Validators.minLength(minLength)],
            ],
            body: [
                this.initialValuesInput.body,
                [Validators.required, Validators.minLength(minLength)],
            ],
            tagList: this.initialValuesInput.tagList.join(' '),
        })
    }

    onSubmit(): void {
        this.articleSubmitEvent.emit(this.form.value)
    }
}
