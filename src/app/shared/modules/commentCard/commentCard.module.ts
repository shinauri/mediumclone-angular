import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CommentCardComponent } from 'src/app/shared/modules/commentCard/components/commentForm/commentCard.component'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [CommonModule, RouterModule.forRoot([])],
    declarations: [CommentCardComponent],
    exports: [CommentCardComponent],
})
export class CommentCardModule {}
