import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { CommentFormComponent } from 'src/app/shared/modules/commentForm/components/commentForm/commentForm.component'
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module'

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesModule],
    declarations: [CommentFormComponent],
    exports: [CommentFormComponent],
})
export class CommentFormModule {}
