import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, query, animate } from '@angular/animations';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations: [
    trigger('recipeDetailsAnime', [
      transition('* <=> *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          animate(300, style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
          animate(300, style({ opacity: 1 }))
        ], { optional: true })
      ])
    ])
  ]
})
export class RecipesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
