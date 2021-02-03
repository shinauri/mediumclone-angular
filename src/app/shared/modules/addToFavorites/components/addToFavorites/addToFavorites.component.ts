import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { addToFavoritesAction } from 'src/app/shared/modules/addToFavorites/store/actions/addToFavorites.action'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'mc-add-to-favorites',
    templateUrl: './addToFavorites.component.html',
    styleUrls: ['./addToFavorites.component.scss'],
})
export class AddToFavoritesComponent implements OnInit {
    @Input('isFavorited') isFavoritedInput: boolean
    @Input('articleSlug') articleSlugInput: string
    @Input('favoritesCount') favoritesCountInput: number
    @Input('btnText') btnTextInput: string

    favoritesCount: number
    isFavorited: boolean

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.isFavorited = this.isFavoritedInput
        this.favoritesCount = this.favoritesCountInput
    }

    handleLike(): void {
        this.store.dispatch(
            addToFavoritesAction({
                isFavorited: this.isFavorited,
                url: `${environment.apiUrl}/articles/${this.articleSlugInput}/favorite`,
            })
        )
        if (this.isFavorited) {
            this.favoritesCount = this.favoritesCount - 1
        } else {
            this.favoritesCount = this.favoritesCount + 1
        }

        this.isFavorited = !this.isFavorited
    }
}
