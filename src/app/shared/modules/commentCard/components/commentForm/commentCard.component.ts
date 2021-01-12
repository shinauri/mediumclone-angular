import { Component, EventEmitter, Input, Output } from '@angular/core'

import { CommentInterface } from 'src/app/shared/modules/commentCard/types/comment.interface'

@Component({
    selector: 'mc-comment-card',
    templateUrl: './commentCard.component.html',
    styleUrls: ['./commentCard.component.scss'],
})
export class CommentCardComponent {
    @Input('comment') commentInput: CommentInterface

    @Output('removeComment')
    removeCommentEvent = new EventEmitter<CommentInterface>()

    constructor() {}

    removeComment(comment: CommentInterface): void {
        this.removeCommentEvent.emit(comment)
    }
}
