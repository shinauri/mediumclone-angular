import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { CommentComponent } from 'src/app/shared/modules/comment/components/comment/comment.component'
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module'

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, BackendErrorMessagesModule],
    declarations: [CommentComponent],
    exports: [CommentComponent],
})
export class CommentModule {}
