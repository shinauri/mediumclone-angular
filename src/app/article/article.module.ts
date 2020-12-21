import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { RouterModule } from '@angular/router'

import { ErrorMessageModule } from 'src/app/shared/modules/errorMesage/components/errorMessage.module'
import { LoadingModule } from 'src/app/shared/modules/loading/components/loading.module'
import { reducers } from 'src/app/article/store/redusers'
import { ArticleService as ArticleSharedService } from 'src/app/shared/services/article.service'
import { ArticleComponent } from 'src/app/article/components/article/article.component'
import { environment } from 'src/environments/environment'
import { TagListModule } from 'src/app/shared/modules/tagList/tagList.module'
import { ArticleService } from 'src/app/article/services/article.service'
import { DeleteArticleEffect } from 'src/app/article/store/effects/deleteArticle.effect'
import { GetArticleEffect } from 'src/app/article/store/effects/getArticle.effect'

const routes = [
    {
        path: environment.routes.articles.article,
        component: ArticleComponent,
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
        StoreModule.forFeature('article', reducers),
        ErrorMessageModule,
        LoadingModule,
        TagListModule,
    ],
    declarations: [ArticleComponent],
    providers: [ArticleSharedService, ArticleService],
})
export class ArticleModule {}
