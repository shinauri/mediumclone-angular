import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RouterModule } from '@angular/router'
import { CommentCardComponent } from 'src/app/shared/modules/comments/components/commentCard/components/commentCard/commentCard.component'
import { IsService } from 'src/app/shared/services/is.service'
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module'
import { ErrorMessageModule } from 'src/app/shared/modules/errorMesage/errorMessage.module'

@NgModule({
    imports: [CommonModule, RouterModule, LoadingModule, ErrorMessageModule],
    declarations: [CommentCardComponent],
    exports: [CommentCardComponent],
    providers: [IsService],
})
export class CommentCardModule {}
