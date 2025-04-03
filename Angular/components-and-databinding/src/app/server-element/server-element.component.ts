import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css'
})

// good practice to explicitly put lifecycle hooks on implement
export class ServerElementComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  // receive data form other components, also can specify the name of the parameter
  @Input('serverElement') element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('header', { static: true }) header: ElementRef;
  @ContentChild('paragraph', { static: true }) paragraph: ElementRef;

  constructor() {
    console.log('constructor called');
  }

  // only hook that receives args
  // first hook to run
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    console.log(changes);

  }

  ngOnInit() {
    console.log('ngOnInit called');
  }

  // runs every time in checks for changes
  // e.g clicking a button, even if it doesn't do anything
  // triggers twice at the beginning in development mode
  ngDoCheck() {
    console.log('ngDoCheck called');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
    console.log('Text Content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    console.log('Text Content: ' + this.header.nativeElement.textContent);

  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }
}
