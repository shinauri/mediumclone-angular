import { Component, Input } from '@angular/core'

@Component({
    selector: 'mc-error-message',
    template: '<div>{{errorMessageInput}}</div>',
})
export class ErrorMessageComponent {
    @Input('errorMessage') errorMessageInput = 'Something went wrong'
}
