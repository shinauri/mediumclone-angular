import { Injectable } from '@angular/core'

import { parseUrl, stringify } from 'query-string'

@Injectable()
export class UtilsService {
    range(start: number, end: number): number[] {
        return [...Array(end).keys()].map((el) => el + start)
    }

    getPaginationUrlWithParams(
        url: string,
        currentPage: number,
        limit: number
    ): string {
        const offset = currentPage * limit - limit
        const parsedUrl = parseUrl(url)
        const stringifiedParams = stringify({
            limit,
            offset,
            ...parsedUrl.query,
        })
        const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
        return apiUrlWithParams
    }
}
