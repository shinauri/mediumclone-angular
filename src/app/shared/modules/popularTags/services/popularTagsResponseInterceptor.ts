import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http'

import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class PopularTagsResponseInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map(this.removeZWNJFromResponseArray),
            catchError((err, caught) => {
                return caught
            })
        )
    }

    private removeZWNJFromResponseArray(event: HttpEvent<any>): HttpEvent<any> {
        if (event instanceof HttpResponse) {
            // tslint:disable-next-line:no-bitwise
            if (!(~~(event.status / 100) > 3)) {
                const url = new URL(event.url)
                if (url.pathname === '/api/tags') {
                    const filteredTags = event.body.tags
                        .map((item) => {
                            return item.replace(/[\u200B-\u200D\uFEFF]/g, '')
                        })
                        .filter((item) => item !== '')

                    event = event.clone({
                        body: {
                            tags: filteredTags,
                        },
                    })
                }
            }
        }
        return event
    }
}
