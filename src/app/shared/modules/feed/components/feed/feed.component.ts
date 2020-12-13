import { Component, Input, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { getFeedAction } from 'src/app/shared/modules/feed/store/actions/getFeed.action'
import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface'
import {
    errorSelector,
    feedSelector,
    isLoadingSelector,
} from 'src/app/shared/modules/feed/store/selectors'

@Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
    @Input('apiUrl') apiUrlInput: string

    isLoading$: Observable<boolean>
    error$: Observable<string | null>
    feed$: Observable<GetFeedResponseInterface | null>

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.initializeValues()
        this.fetchData()
    }

    private initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.error$ = this.store.pipe(select(errorSelector))
        this.feed$ = this.store.pipe(select(feedSelector))
    }

    private fetchData(): void {
        this.store.dispatch(getFeedAction({ url: this.apiUrlInput }))
    }
}
