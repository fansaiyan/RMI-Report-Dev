import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { CanActiveGuardService } from './core/services/can-active-guard.service';
import {NavigationEnd, Router} from '@angular/router';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnDestroy {
    titleRight: string = '';
    subscription: Subscription;
    items: MenuItem[];
    title: string;
    constructor(
      public breadcrumbService: BreadcrumbService,
      private canActive: CanActiveGuardService,
      private router: Router) {
        this.router.events.subscribe((resp: NavigationEnd) => {
            if(resp.url && resp.url.includes('smi')) {
                this.titleRight = 'Sustainability Maturity Index';
            } else {
                this.titleRight = 'Risk Maturity Index';
            }
        });
        this.canActive.titleComponent$.subscribe(resp => {
            this.title = resp;
        });
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
