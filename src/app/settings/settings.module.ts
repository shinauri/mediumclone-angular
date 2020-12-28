import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'

import { SettingsComponent } from 'src/app/settings/components/settings/settings.component'
import { reducers } from 'src/app/settings/store/reducers'
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module'

const routes: Routes = [
    {
        path: 'settings',
        component: SettingsComponent,
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('settings', reducers),
        ReactiveFormsModule,
        BackendErrorMessagesModule,
    ],
    declarations: [SettingsComponent],
})
export class SettingsModule {}
