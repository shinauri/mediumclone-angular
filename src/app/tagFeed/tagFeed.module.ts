import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { FeedModule } from 'src/app/shared/modules/feed/feed.module'
import { BannerModule } from 'src/app/shared/modules/banner/components/banner.module'
import { PopularTagsModule } from 'src/app/shared/modules/popularTags/popularTags.module'
import { FeedTogglerModule } from 'src/app/shared/modules/feedToggler/feedToggler.module'
import { environment } from 'src/environments/environment'
import { TagFeedComponent } from 'src/app/tagFeed/components/tagFeed/tagFeed.component'

const routes: Routes = [
    {
        path: environment.routes.feeds.tag,
        component: TagFeedComponent,
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FeedModule,
        BannerModule,
        PopularTagsModule,
        FeedTogglerModule,
    ],
    declarations: [TagFeedComponent],
})
export class TagFeedModule {}
