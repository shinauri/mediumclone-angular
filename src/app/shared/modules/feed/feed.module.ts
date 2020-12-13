import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { RouterModule } from '@angular/router'

import { FeedComponent } from 'src/app/shared/modules/feed/components/feed/feed.component'
import { GetFeedEffect } from 'src/app/shared/modules/feed/store/effects/getFeed.effect'
import { reducers } from 'src/app/shared/modules/feed/store/redusers'
import { FeedService } from 'src/app/shared/modules/feed/services/feed.service'
import { ErrorMessageModule } from 'src/app/shared/modules/errorMesage/components/errorMessage.module'
import { LoadingModule } from 'src/app/shared/modules/loading/components/loading.module'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        EffectsModule.forFeature([GetFeedEffect]),
        StoreModule.forFeature('feed', reducers),
        ErrorMessageModule,
        LoadingModule,
    ],
    declarations: [FeedComponent],
    exports: [FeedComponent],
    providers: [FeedService],
})
export class FeedModule {}
