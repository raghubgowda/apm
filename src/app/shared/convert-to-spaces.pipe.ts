import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    'name':'convertospaces'
})
export class ConvertToSpacesPipe implements PipeTransform{
    transform(value:string, character:string): string{
        return value.replace(character, ' ');
    }
}