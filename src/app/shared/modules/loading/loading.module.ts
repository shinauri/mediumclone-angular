import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LoadingComponent } from 'src/app/shared/modules/loading/components/loading/loadingcomponent'

@NgModule({
    imports: [CommonModule],
    declarations: [LoadingComponent],
    exports: [LoadingComponent],
})
export class LoadingModule {}
