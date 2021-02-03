import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { GetCommentsResponseInterface } from 'src/app/shared/modules/comments/types/getCommentsResponce.interface'
import { CommentInterface } from 'src/app/shared/modules/comments/components/commentCard/types/comment.interface'
import { CommentInputInterface } from 'src/app/shared/modules/comments/components/commentForm/types/commentInput.interface'
import { CreateCommentResponseInterface } from 'src/app/shared/modules/comments/types/createCommentResponse.interface'

@Injectable()
export class CommentsService {
    constructor(private http: HttpClient) {}

    create(
        url: string,
        commentInput: CommentInputInterface
    ): Observable<CommentInterface> {
        return this.http
            .post<CreateCommentResponseInterface>(url, commentInput)
            .pipe(
                map(
                    (response: CreateCommentResponseInterface) =>
                        response.comment
                )
            )
    }

    getComments(url: string): Observable<CommentInterface[]> {
        return this.http
            .get<GetCommentsResponseInterface>(url)
            .pipe(
                map(
                    (response: GetCommentsResponseInterface) =>
                        response.comments
                )
            )
    }

    delete(url): Observable<{}> {
        return this.http.delete<{}>(url)
    }
}
