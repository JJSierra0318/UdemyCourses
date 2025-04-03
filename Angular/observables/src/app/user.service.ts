import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root' })
export class UserService {
  // used to emit events from an active observable e.g. a button is clicked
  activatedEmitter = new Subject<boolean>();
}