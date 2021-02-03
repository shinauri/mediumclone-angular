import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CommentsComponent } from 'src/app/shared/modules/comments/components/comments/comments.component'
import { CommentCardModule } from 'src/app/shared/modules/comments/components/commentCard/commentCard.module'
import { CommentFormModule } from 'src/app/shared/modules/comments/components/commentForm/commentForm.module'
import { EffectsModule } from '@ngrx/effects'
import { GetCommentsEffect } from 'src/app/shared/modules/comments/store/effects/getComments.effect'
import { DeleteCommentEffect } from 'src/app/shared/modules/comments/store/effects/deleteComment.effect'
import { CommentsService } from 'src/app/shared/modules/comments/services/comments.service'
import { StoreModule } from '@ngrx/store'
import { ErrorMessageModule } from 'src/app/shared/modules/errorMesage/errorMessage.module'
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module'
import { reducers } from 'src/app/shared/modules/comments/store/reducers'
import { PostCommentsEffect } from 'src/app/shared/modules/comments/store/effects/postComments.effect'

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([
            GetCommentsEffect,
            DeleteCommentEffect,
            PostCommentsEffect,
        ]),
        StoreModule.forFeature('comments', reducers),
        CommentCardModule,
        CommentFormModule,
        ErrorMessageModule,
        LoadingModule,
    ],
    declarations: [CommentsComponent],
    exports: [CommentsComponent],
    providers: [CommentsService],
})
export class CommentsModule {}
