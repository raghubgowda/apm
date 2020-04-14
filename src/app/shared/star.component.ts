import { Component, OnChanges, Input, Output , EventEmitter} from '@angular/core';

@Component({
    selector:"pm-star",
    templateUrl:"./star.component.html",
    styleUrls: ["./star.component.css"]
})
export class StarComponent implements OnChanges{
    @Input() rating: number = 4;
    startWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void{
        this.startWidth = this.rating * 75 / 5 ;
    }

    onClick() : void{
        this.ratingClicked.emit(`The rating ${this.rating} is clicked!!!`);
    }

}