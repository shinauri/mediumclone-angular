import { Component } from '@angular/core'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'mc-your-feed',
    templateUrl: './yourFeed.component.html',
})
export class YourFeedComponent {
    apiUrl = environment.endpoints.feeds.your
}
