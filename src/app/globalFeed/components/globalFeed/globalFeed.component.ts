import { Component } from '@angular/core'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'mc-global-feed',
    templateUrl: './globalFeed.component.html',
})
export class GlobalFeedComponent {
    apiUrl = environment.endpoints.feeds.global
}
