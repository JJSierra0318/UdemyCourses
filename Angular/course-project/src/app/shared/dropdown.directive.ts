import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    // listen to clicks across all the document
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        // check if the element is the one clicked, if not close the dropdown
        // with this, a click anywhere in the document will close the dropdown
        this.isOpen = this.elRef.nativeElement.contains(event.target) ?
            !this.isOpen : false
    }

    constructor(private elRef: ElementRef) { }
}