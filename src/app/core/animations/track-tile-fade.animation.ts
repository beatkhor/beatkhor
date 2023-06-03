import { animate, style, transition, trigger } from '@angular/animations';

export function trackTileFadeIn(ms = 100) {
  return trigger(
    'trackTileFadeIn', [
      transition(':enter', [
        style({ opacity: 0}),
        animate(ms + 'ms', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({ opacity: 1}),
        animate('0ms', style({opacity: 0}))
      ])
    ]
  );
}