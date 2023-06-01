import { Component } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  currentPage = "";

  constructor(private router: Router, private activateRoute: ActivatedRoute) {
    localStorage.removeItem("currentSymbol");
    if(!localStorage.getItem("currentMoney")) {
      localStorage.setItem("currentMoney", "25000");
    }
    
    this.router.events.subscribe(
      (event: NavigationEvent) => {
          if(event instanceof NavigationStart) {
            let pathParams = event.url.split('/');
            if (pathParams.length == 3 && pathParams[1] == "search" && pathParams[2] != 'home') {
              this.currentPage = "search";
            } else if (pathParams.length == 2 && pathParams[1] == "watchlist") {
              this.currentPage = "watchlist";
            } else if (pathParams.length == 2 && pathParams[1] == "portfolio") {
              this.currentPage = "portfolio"
            } else {
              this.currentPage = "";
            }
          }
    });
  }
}
