import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { followAction } from 'src/app/shared/modules/follow/store/actions/follow.action'

@Component({
    selector: 'mc-follow',
    templateUrl: './follow.component.html',
    styleUrls: ['./follow.component.scss'],
})
export class FollowComponent implements OnInit {
    @Input('isFollowed') isFollowedInput: boolean
    @Input('followUrl') followUrlInput: string
    @Input('userName') userNameInput: string

    isFollowed: boolean
    userName: string

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.isFollowed = this.isFollowedInput
        this.userName = this.userNameInput
    }

    handleFollow(): void {
        this.store.dispatch(
            followAction({
                isFollowed: this.isFollowed,
                url: this.followUrlInput,
            })
        )

        this.isFollowed = !this.isFollowed
    }
}
