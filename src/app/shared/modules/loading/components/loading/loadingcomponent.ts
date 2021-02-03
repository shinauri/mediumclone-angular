import { Component, Input } from '@angular/core'

@Component({
    selector: 'mc-loading',
    template: '<div>{{loadingTextInput}}</div>',
})
export class LoadingComponent {
    @Input('loadingText') loadingTextInput: undefined | string = 'Loading...'
}
