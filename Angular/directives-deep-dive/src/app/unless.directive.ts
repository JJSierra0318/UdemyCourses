import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  // template, as it is the element to which Angular transforms when using structural directives
  // the second parameter is the where
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
