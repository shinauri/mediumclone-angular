import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

import { environment } from 'src/environments/environment'

@Component({
    selector: 'mc-tag-feed',
    templateUrl: './tagFeed.component.html',
})
export class TagFeedComponent implements OnInit {
    apiUrl: string
    tagName: string

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            // this.tagName = this.route.snapshot.paramMap.get('slug')
            this.tagName = params.slug
            this.apiUrl = `${environment.endpoints.feeds.tag}${this.tagName}`
        })
    }
}
