import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { registerAction } from 'src/app/auth/store/actions/register.action'
import { isSubmittingSelector } from 'src/app/auth/store/selectors'
import { AuthService } from 'src/app/auth/services/auth.service'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'

@Component({
    selector: 'mc-register',
    templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
    form: FormGroup
    isSubmitting$: Observable<boolean>

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.initializeForm()
        this.initializeValues()
    }

    initializeValues(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    }

    initializeForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: '',
            password: '',
        })
    }

    onSubmit(): void {
        console.log(this.form.value)
        this.store.dispatch(registerAction(this.form.value))
        this.authService
            .register(this.form.value)
            .subscribe((currentUser: CurrentUserInterface) => {
                console.log(currentUser)
            })
    }
}
