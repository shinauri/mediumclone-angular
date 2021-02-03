import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { ProfileInterface } from 'src/app/shared/types/profile.interface'
import { environment } from 'src/environments/environment'
import { getUserProfileAction } from 'src/app/userProfile/store/actions/getUserProfile.action'
import {
    errorSelector,
    isLoadingSelector,
    userProfileSelector,
} from 'src/app/userProfile/store/selectors'
import { IsService, CurrentUser } from 'src/app/shared/services/is.service'

@Component({
    selector: 'mc-user-profile',
    templateUrl: './userProfile.component.html',
    styleUrls: ['./userProfile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
    isLoading$: Observable<boolean>
    error$: Observable<string | null>
    profile$: Observable<CurrentUser>
    userProfileSubscription: Subscription

    userProfile: ProfileInterface
    slug: string
    public postsQueryParams = {
        self: {},
        favorites: {},
    }

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private is: IsService
    ) {}

    ngOnDestroy(): void {
        this.userProfileSubscription.unsubscribe()
    }

    ngOnInit(): void {
        this.initializeValues()
        this.initializeListeners()
    }

    private initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.error$ = this.store.pipe(select(errorSelector))
        this.profile$ = this.is.currentUser()
    }

    private initializeListeners(): void {
        this.userProfileSubscription = this.store
            .pipe(select(userProfileSelector))
            .subscribe((userProfile: ProfileInterface) => {
                this.userProfile = userProfile
            })

        this.route.queryParams.subscribe((params: Params) => {
            this.setQueryParams(params)
        })

        this.route.params.subscribe((params: Params) => {
            this.slug = params.slug
            this.fetchUserProfile()
        })
    }

    private setQueryParams(params: Params): void {
        const isFavorites = this.router.url.includes('favorites')

        this.postsQueryParams.favorites = isFavorites ? params : {}
        this.postsQueryParams.self = isFavorites ? {} : params
    }

    private fetchUserProfile(): void {
        const url = `${environment.apiUrl}${environment.endpoints.profiles.profile}/${this.slug}`
        this.store.dispatch(getUserProfileAction({ url }))
    }

    public getApiUrl(): string {
        const isFavorites = this.router.url.includes('favorites')
        return isFavorites
            ? `/articles?favorited=${this.slug}`
            : `/articles?author=${this.slug}`
    }

    public getProfileUrl(userName: string): string {
        return `${environment.apiUrl}/profiles/${userName}/follow`
    }
}
