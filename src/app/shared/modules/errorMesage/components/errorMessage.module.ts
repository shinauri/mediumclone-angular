import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ErrorMessageComponent } from 'src/app/shared/modules/errorMesage/components/errorMessage/errorMessage.component'

@NgModule({
    imports: [CommonModule],
    declarations: [ErrorMessageComponent],
    exports: [ErrorMessageComponent],
})
export class ErrorMessageModule {}
