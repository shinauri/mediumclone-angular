import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { RegisterComponent } from 'src/app/auth/components/register/register.component'
import { LoginComponent } from 'src/app/auth/components/login/login.component'
import { AuthService } from 'src/app/auth/services/auth.service'
import { reducers } from 'src/app/auth/store/reducers'
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect'
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module'
import { PersistenceService } from 'src/app/shared/services/persistence.service'
import { LoginEffect } from 'src/app/auth/store/effects/login.effect'

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([RegisterEffect, LoginEffect]),
        BackendErrorMessagesModule,
    ],
    declarations: [RegisterComponent, LoginComponent],
    providers: [AuthService, PersistenceService],
})
export class AuthModule {}
