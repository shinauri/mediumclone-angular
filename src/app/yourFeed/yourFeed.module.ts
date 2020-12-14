import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { FeedModule } from 'src/app/shared/modules/feed/feed.module'
import { BannerModule } from 'src/app/shared/modules/banner/components/banner.module'
import { YourFeedComponent } from 'src/app/yourFeed/components/yourFeed/yourFeed.component'

const routes: Routes = [
    {
        path: 'feed',
        component: YourFeedComponent,
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FeedModule,
        BannerModule,
    ],
    declarations: [YourFeedComponent],
})
export class YourFeedModule {}
