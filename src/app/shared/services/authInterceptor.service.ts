import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'

import { PersistenceService } from 'src/app/shared/services/persistence.service'
import { environment } from 'src/environments/environment'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private persistenceService: PersistenceService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.persistenceService.get(environment.token)
        request = request.clone({
            setHeaders: {
                Authorization: token ? `Token ${token}` : '',
            },
        })

        return next.handle(request)
    }
}
