import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { RouterModule } from '@angular/router'

import { FeedComponent } from 'src/app/shared/modules/feed/components/feed/feed.component'
import { GetFeedEffect } from 'src/app/shared/modules/feed/store/effects/getFeed.effect'
import { reducers } from 'src/app/shared/modules/feed/store/redusers'
import { FeedService } from 'src/app/shared/modules/feed/services/feed.service'
import { ErrorMessageModule } from 'src/app/shared/modules/errorMesage/errorMessage.module'
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module'
import { PaginationModule } from 'src/app/shared/modules/pagination/pagination.module'
import { UtilsService } from 'src/app/shared/services/utils.service'
import { TagListModule } from 'src/app/shared/modules/tagList/tagList.module'
import { AddToFavoritesModule } from 'src/app/shared/modules/addToFavorites/addToFavorites.module'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        EffectsModule.forFeature([GetFeedEffect]),
        StoreModule.forFeature('feed', reducers),
        ErrorMessageModule,
        LoadingModule,
        PaginationModule,
        TagListModule,
        AddToFavoritesModule,
    ],
    declarations: [FeedComponent],
    exports: [FeedComponent],
    providers: [FeedService, UtilsService],
})
export class FeedModule {}
