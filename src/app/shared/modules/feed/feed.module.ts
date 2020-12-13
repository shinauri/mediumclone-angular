import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { RouterModule } from '@angular/router'

import { FeedComponent } from 'src/app/shared/modules/feed/components/feed/feed.component'
import { GetFeedEffect } from 'src/app/shared/modules/feed/store/effects/getFeed.effect'
import { reducers } from 'src/app/shared/modules/feed/store/redusers'
import { FeedService } from 'src/app/shared/modules/feed/services/feed.service'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        EffectsModule.forFeature([GetFeedEffect]),
        StoreModule.forFeature('feed', reducers),
    ],
    declarations: [FeedComponent],
    exports: [FeedComponent],
    providers: [FeedService],
})
export class FeedModule {}
