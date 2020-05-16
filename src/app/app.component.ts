import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { RouteingAnimation } from './shared/routing-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [RouteingAnimation]
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAN90QbzCpEk11FRnQL-LRDEXSXVh5Z6tM',
      authDomain: 'ng-recipe-book-9f1fd.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-9f1fd.firebaseio.com',
      projectId: 'ng-recipe-book-9f1fd',
      storageBucket: 'ng-recipe-book-9f1fd.appspot.com',
      messagingSenderId: '227619358075'
    });
  }
}
