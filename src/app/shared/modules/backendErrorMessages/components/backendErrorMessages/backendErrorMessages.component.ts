import { Component, Input, OnInit } from '@angular/core'

import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'

@Component({
    selector: 'mc-backend-error-messages',
    templateUrl: './backendErrorMessages.component.html',
})
export class BackendErrorMessagesComponent implements OnInit {
    @Input('backendErrors') backendErrorsInput: BackendErrorsInterface
    errorMessages: string[]

    ngOnInit(): void {
        this.errorMessages = Object.keys(this.backendErrorsInput).map(
            (name: string) => {
                const messages = this.backendErrorsInput[name].join(', ')
                return `[ ${name} ] ${messages}`
            }
        )
    }
}
