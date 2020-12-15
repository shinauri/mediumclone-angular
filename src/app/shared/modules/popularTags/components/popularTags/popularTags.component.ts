import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'

import { getPopularTagsAction } from 'src/app/shared/modules/popularTags/store/actions/getPopularTags.action'
import { PopularTagType } from 'src/app/shared/types/popularTag.type'
import {
    errorSelector,
    isLoadingSelector,
    popularTagsSelector,
} from 'src/app/shared/modules/popularTags/store/selectors'

@Component({
    selector: 'mc-popular-tags',
    templateUrl: './popularTags.component.html',
})
export class PopularTagsComponent implements OnInit, OnDestroy {
    popularTags$: Observable<PopularTagType[] | null>
    isLoading$: Observable<boolean>
    error$: Observable<string | null>

    private popularTagsSubscription: Subscription

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.initializeValues()
        this.fetchData()
    }

    private initializeValues(): void {
        this.popularTags$ = this.store.pipe(select(popularTagsSelector))
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.error$ = this.store.pipe(select(errorSelector))
    }

    private fetchData(): void {
        this.store.dispatch(getPopularTagsAction())
    }

    ngOnDestroy(): void {}
}
