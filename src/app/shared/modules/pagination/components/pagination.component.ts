import { Component, Input, OnInit } from '@angular/core'
import { UtilsService } from 'src/app/shared/services/utils.service'

@Component({
    selector: 'mc-pagination',
    templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
    @Input('total') totalInput: number
    @Input('limit') limitInput: number
    @Input('currentPage') currentPageInput: number
    @Input('url') urlInput: string

    pagesCount: number
    pages: number[]

    constructor(private utilsService: UtilsService) {}

    ngOnInit(): void {
        this.initializeValues()
    }

    private initializeValues(): void {
        this.pagesCount = Math.ceil(this.totalInput / this.limitInput)
        this.pages = this.utilsService.range(1, this.pagesCount)
    }
}
