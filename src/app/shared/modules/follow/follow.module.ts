import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'

import { FollowComponent } from 'src/app/shared/modules/follow/components/follow/follow.component'
import { FollowService } from 'src/app/shared/modules/follow/services/follow.service'
import { FollowEffect } from 'src/app/shared/modules/follow/store/effects/follow.effect'

@NgModule({
    imports: [CommonModule, EffectsModule.forFeature([FollowEffect])],
    declarations: [FollowComponent],
    exports: [FollowComponent],
    providers: [FollowService],
})
export class FollowModule {}
