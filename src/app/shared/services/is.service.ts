import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { combineLatest, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { articleSelector } from 'src/app/article/store/selectors'
import { currentUserSelector } from 'src/app/auth/store/selectors'
import { userProfileSelector } from 'src/app/userProfile/store/selectors'
import { ArticleInterface } from 'src/app/shared/types/article.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { ProfileInterface } from 'src/app/shared/types/profile.interface'

export type CurrentUser = { isCurrent: boolean }

@Injectable()
export class IsService {
    constructor(private store: Store) {}

    public author(): Observable<boolean> {
        return combineLatest([
            this.store.pipe(select(articleSelector), filter(Boolean)),
            this.store.pipe(select(currentUserSelector), filter(Boolean)),
        ]).pipe(
            map(
                ([article, currentUser]: [
                    ArticleInterface,
                    CurrentUserInterface
                ]) => {
                    return article.author.username === currentUser.username
                }
            )
        )
    }

    public currentUser(): Observable<CurrentUser> {
        return combineLatest([
            this.store.pipe(select(userProfileSelector), filter(Boolean)),
            this.store.pipe(select(currentUserSelector), filter(Boolean)),
        ]).pipe(
            map(
                ([userProfile, currentUser]: [
                    ProfileInterface,
                    CurrentUserInterface
                ]) => {
                    const isCurrent =
                        currentUser.username === userProfile.username
                    return { isCurrent }
                }
            )
        )
    }

    public commentAuthor(profile: ProfileInterface): Observable<boolean> {
        return this.store.pipe(
            select(currentUserSelector),
            filter(Boolean),
            map((currentUser: CurrentUserInterface) => {
                return currentUser.username === profile.username
            })
        )
    }
}
