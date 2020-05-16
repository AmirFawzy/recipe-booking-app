import { trigger, transition, query, style, animate, group, stagger } from '@angular/animations';

export const RouteingAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    group([
      query(':enter', [
        style({ opacity: 0 })
      ], { optional: true }),
      query(':enter .shopping-list-items', [
        style({ opacity: 0 })
      ], { optional: true })
    ]),
    query(':leave', [
      style({ opacity: 1 }),
      animate(300, style({ opacity: 0 }))
    ], { optional: true }),
    group([
      query(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ], { optional: true }),
      query(':enter .shopping-list-items', stagger(300, [
        animate('1s 300ms ease-in-out', style({ opacity: 1 }))
      ]), { optional: true })
    ])
  ])
]);
