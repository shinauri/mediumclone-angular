import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import { CommentInputInterface } from 'src/app/shared/modules/comments/components/commentForm/types/commentInput.interface'

@Component({
    selector: 'mc-comment-form',
    templateUrl: './commentForm.component.html',
    styleUrls: ['./commentForm.component.scss'],
})
export class CommentFormComponent implements OnInit {
    @Input('isSubmitting') isSubmittingInput: boolean
    @Input('backendErrors') backendErrorsInput: BackendErrorsInterface | null
    @Input('commentAuthorImg') commentAuthorImgInput: string

    @Output('commentSubmit')
    commentSubmitEvent = new EventEmitter<CommentInputInterface>()

    form: FormGroup

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm()
    }

    private initializeForm(): void {
        const minLength = 3
        this.form = this.fb.group({
            body: ['', [Validators.required, Validators.minLength(minLength)]],
        })
    }

    onSubmit(): void {
        this.commentSubmitEvent.emit(this.form.value)
        this.form.reset()
    }
}
