import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module'
import { CommentFormComponent } from 'src/app/shared/modules/comments/components/commentForm/components/commentForm/commentForm.component'

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesModule],
    declarations: [CommentFormComponent],
    exports: [CommentFormComponent],
})
export class CommentFormModule {}
