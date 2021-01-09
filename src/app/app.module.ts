import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store'
import { EffectsModule } from '@ngrx/effects'

import { environment } from 'src/environments/environment'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { AppComponent } from 'src/app/app.component'
import { AuthModule } from 'src/app/auth/auth.module'
import { TopBarModule } from 'src/app/shared/modules/topBar/topBar.module'
import { PersistenceService } from 'src/app/shared/services/persistence.service'
import { AuthInterceptorService } from 'src/app/shared/services/authInterceptor.service'
import { GlobalFeedModule } from 'src/app/globalFeed/globalFeed.module'
import { YourFeedModule } from 'src/app/yourFeed/yourFeed.module'
import { PopularTagsResponseInterceptor } from 'src/app/shared/modules/popularTags/services/popularTagsResponseInterceptor'
import { TagFeedModule } from 'src/app/tagFeed/tagFeed.module'
import { ArticleModule } from 'src/app/article/article.module'
import { CreateArticleModule } from 'src/app/createArticle/createArticle.module'
import { EditArticleModule } from 'src/app/editArticle/editArticle.module'
import { SettingsModule } from 'src/app/settings/settings.module'
import { UserProfileModule } from 'src/app/userProfile/userProfile.module'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        HttpClientModule,
        StoreModule.forRoot({ router: routerReducer }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        StoreRouterConnectingModule.forRoot(),
        TopBarModule,
        GlobalFeedModule,
        YourFeedModule,
        TagFeedModule,
        CreateArticleModule,
        ArticleModule,
        EditArticleModule,
        SettingsModule,
        UserProfileModule,
    ],
    providers: [
        PersistenceService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: PopularTagsResponseInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
