import { Component } from '@angular/core';
import {UIStore} from "./store/UI/UI.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {loadSpinner} from "./store/UI/UI.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadSpinner!: Observable<Boolean>
  constructor(private UIStore: Store<{UI: UIStore}>) {
    this.loadSpinner = this.UIStore.select(loadSpinner)
  }
}
