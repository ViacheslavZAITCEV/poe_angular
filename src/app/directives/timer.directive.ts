import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTimer]'
})
export class TimerDirective {

  private index: number;
  private timer: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  @Input() set appTimer(time: number) {
    this.index = 0;
    this.timer = setInterval(() => {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      if (this.index > 200) {
        clearInterval(this.timer);
      }
      this.index += 1;
    }, time)
  }
}