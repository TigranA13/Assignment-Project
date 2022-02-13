import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title: string = 'Configurable Form Fields';
  currentRoute: string = '';

  subscription: Subscription;

  constructor(
    private router: Router,
    private titleService: Title
  ) {
    // Set Title by route
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          // get current route from url
          this.currentRoute = event.url.replace('/', '');
          const title = `${this.title} - ${this.currentRoute}`;
          // set app title
          this.titleService.setTitle(title);
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
