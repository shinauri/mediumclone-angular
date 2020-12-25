import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { environment } from 'src/environments/environment'
import { ArticleFormModule } from 'src/app/shared/modules/articleForm/articleForm.module'
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service'
import { EditArticleComponent } from 'src/app/editArticle/components/editArticle/editArticle.component'
import { UpdateArticleService } from 'src/app/editArticle/services/updateArticle.service'
import { UpdateArticleEffect } from 'src/app/editArticle/store/effects/updateArticle.effect'
import { GetArticleEffect } from 'src/app/editArticle/store/effects/getArticle.effect'
import { reducers } from 'src/app/editArticle/store/reducers'
import { LoadingModule } from 'src/app/shared/modules/loading/components/loading.module'

const routes = [
    {
        path: environment.routes.articles.edit,
        component: EditArticleComponent,
    },
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ArticleFormModule,
        LoadingModule,
        EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
        StoreModule.forFeature('editArticle', reducers),
    ],
    declarations: [EditArticleComponent],
    providers: [UpdateArticleService, SharedArticleService],
})
export class EditArticleModule {}
