import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'

import { getFeedAction } from 'src/app/shared/modules/feed/store/actions/getFeed.action'
import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface'
import {
    errorSelector,
    feedSelector,
    isLoadingSelector,
} from 'src/app/shared/modules/feed/store/selectors'
import { environment } from 'src/environments/environment'
import { parseUrl, stringify } from 'query-string'
import { UtilsService } from 'src/app/shared/services/utils.service'

@Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit, OnDestroy {
    @Input('apiUrl') apiUrlInput: string

    isLoading$: Observable<boolean>
    error$: Observable<string | null>
    feed$: Observable<GetFeedResponseInterface | null>
    limit = environment.limit
    baseUrl: string
    currentPage: number
    queryParamsSubscription: Subscription

    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private utilsService: UtilsService
    ) {}

    ngOnInit(): void {
        this.initializeValues()
        this.initializeListeners()
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe()
    }

    private initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.error$ = this.store.pipe(select(errorSelector))
        this.feed$ = this.store.pipe(select(feedSelector))
        this.baseUrl = this.router.url.split('?')[0]
    }

    private initializeListeners(): void {
        this.queryParamsSubscription = this.route.queryParams.subscribe(
            (params: Params) => {
                this.currentPage = Number(params.page || '1')
                this.fetchFeed()
            }
        )
    }

    private fetchFeed(): void {
        const apiUriWithParams = this.utilsService.getPaginationUrlWithParams(
            this.apiUrlInput,
            this.currentPage,
            this.limit
        )
        this.store.dispatch(getFeedAction({ url: apiUriWithParams }))
    }
}
