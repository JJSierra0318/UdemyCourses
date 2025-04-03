import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    // attribute style / recognized without []
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}