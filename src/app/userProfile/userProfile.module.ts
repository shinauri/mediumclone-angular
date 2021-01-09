import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { UserProfileComponent } from 'src/app/userProfile/components/userProfile/userProfile.component'
import { environment } from 'src/environments/environment'
import { UserProfileService } from 'src/app/userProfile/services/userProfile.service'
import { GetUserProfileEffect } from 'src/app/userProfile/store/effects/getUserProfile.effect'
import { reducers } from 'src/app/userProfile/store/reducers'
import { FeedModule } from 'src/app/shared/modules/feed/feed.module'
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module'

const routes = [
    {
        path: environment.routes.profile.home,
        component: UserProfileComponent,
    },
    {
        path: environment.routes.profile.favorites,
        component: UserProfileComponent,
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([GetUserProfileEffect]),
        StoreModule.forFeature('userProfile', reducers),
        FeedModule,
        LoadingModule,
    ],
    declarations: [UserProfileComponent],
    providers: [UserProfileService],
})
export class UserProfileModule {}
