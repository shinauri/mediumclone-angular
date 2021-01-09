import { Component, OnDestroy, OnInit } from '@angular/core'
import { combineLatest, Observable, Subscription } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { filter, map } from 'rxjs/operators'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { ProfileInterface } from 'src/app/shared/types/profile.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { environment } from 'src/environments/environment'
import { getUserProfileAction } from 'src/app/userProfile/store/actions/getUserProfile.action'
import {
    errorSelector,
    isLoadingSelector,
    userProfileSelector,
} from 'src/app/userProfile/store/selectors'
import { currentUserSelector } from 'src/app/auth/store/selectors'

@Component({
    selector: 'mc-user-profile',
    templateUrl: './userProfile.component.html',
    styleUrls: ['./userProfile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
    isLoading$: Observable<boolean>
    error$: Observable<string | null>
    isCurrentUserProfile$: Observable<boolean>
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
        private router: Router
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
        this.isCurrentUserProfile$ = this.isCurrentUserProfile()
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

    private isCurrentUserProfile(): Observable<boolean> {
        return combineLatest([
            this.store.pipe(select(userProfileSelector), filter(Boolean)),
            this.store.pipe(select(currentUserSelector), filter(Boolean)),
        ]).pipe(
            map(
                ([userProfile, currentUser]: [
                    ProfileInterface,
                    CurrentUserInterface
                ]) => {
                    return currentUser.username === userProfile.username
                }
            )
        )
    }
}
