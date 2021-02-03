import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core'
import { Observable } from 'rxjs'

import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'
import { IsService } from 'src/app/shared/services/is.service'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'

@Component({
    selector: 'mc-comment-card',
    templateUrl: './commentCard.component.html',
    styleUrls: ['./commentCard.component.scss'],
})
export class CommentCardComponent implements OnInit {
    @Input('comment') commentInput: CommentInterface
    @Input('deletedCommentsIds') deletedCommentsIdsInput: number[]
    @Input('deleteCommentsErrors')
    deleteCommentsErrorsInput: BackendErrorsInterface[]

    @Output('removeComment')
    removeCommentEvent = new EventEmitter<CommentInterface>()
    isCommentAuthor$: Observable<boolean>

    constructor(private is: IsService) {}

    ngOnInit(): void {
        this.initializeValues()
    }

    private initializeValues(): void {
        this.isCommentAuthor$ = this.is.commentAuthor(this.commentInput.author)
    }

    removeComment(comment: CommentInterface): void {
        this.removeCommentEvent.emit(comment)
    }

    errorDelete(): boolean {
        const deleteCommentsErrorIds = this.deleteCommentsErrorsInput.map(
            (error) => {
                return Number(error.commentId)
            }
        )

        return deleteCommentsErrorIds.includes(this.commentInput.id)
    }

    isDeleting(): boolean {
        return this.deletedCommentsIdsInput.includes(this.commentInput.id)
    }
}
