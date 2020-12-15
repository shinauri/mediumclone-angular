import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'zwnj',
})
export class ZeroWidthNonJoinerPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/[\u200B-\u200D\uFEFF]/g, '')
    }
}
