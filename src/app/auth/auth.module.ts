import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { RegisterComponent } from 'src/app/auth/components/register/register.component'
import { LoginComponent } from 'src/app/auth/components/login/login.component'
import { AuthService } from 'src/app/auth/services/auth.service'
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect'
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module'
import { PersistenceService } from 'src/app/shared/services/persistence.service'
import { LoginEffect } from 'src/app/auth/store/effects/login.effect'
import { GetCurrentUserEffect } from 'src/app/auth/store/effects/getCurrentUser.effect'
import { UpdateCurrentUserEffect } from 'src/app/auth/store/effects/updateCurrentUser.effect'
import { reducers } from 'src/app/auth/store/reducers'
import { environment } from 'src/environments/environment'
import { LogoutEffect } from 'src/app/auth/store/effects/logout.effect'

const routes: Routes = [
    {
        path: environment.routes.auth.register,
        component: RegisterComponent,
    },
    {
        path: environment.routes.auth.login,
        component: LoginComponent,
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([
            RegisterEffect,
            LoginEffect,
            GetCurrentUserEffect,
            UpdateCurrentUserEffect,
            LogoutEffect,
        ]),
        BackendErrorMessagesModule,
    ],
    declarations: [RegisterComponent, LoginComponent],
    providers: [AuthService, PersistenceService],
})
export class AuthModule {}
