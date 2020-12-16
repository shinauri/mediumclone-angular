import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { RouterModule } from '@angular/router'

import { reducers } from 'src/app/shared/modules/popularTags/store/redusers'
import { PopularTagsComponent } from 'src/app/shared/modules/popularTags/components/popularTags/popularTags.component'
import { PopularTagsService } from 'src/app/shared/modules/popularTags/services/popularTags.service'
import { GetPopularTagsEffect } from 'src/app/shared/modules/popularTags/store/effects/getPopularTags.effect'
import { LoadingModule } from 'src/app/shared/modules/loading/components/loading.module'
import { ErrorMessageModule } from 'src/app/shared/modules/errorMesage/components/errorMessage.module'

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('popularTags', reducers),
        EffectsModule.forFeature([GetPopularTagsEffect]),
        RouterModule,
        LoadingModule,
        ErrorMessageModule,
    ],
    declarations: [PopularTagsComponent],
    exports: [PopularTagsComponent],
    providers: [PopularTagsService],
})
export class PopularTagsModule {}
