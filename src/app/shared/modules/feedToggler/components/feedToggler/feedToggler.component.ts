import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { isLoggedInSelector } from 'src/app/auth/store/selectors'

@Component({
    selector: 'mc-feed-toggler',
    templateUrl: './feedToggler.component.html',
})
export class FeedTogglerComponent implements OnInit {
    @Input('tagName') tagNameInput: string | null
    isLoggedIn$: Observable<boolean>

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.initializeValues()
    }

    private initializeValues(): void {
        this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    }
}
