import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent,
                private authService: AuthenticationService) {}

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
        ];
        if(this.authService.isSuperAdmin()){
            this.model.push(
                {
                    label: 'Data Master', icon: 'pi pi-fw pi-th-large', routerLink: ['/master'],
                    items: [
                        {label: 'Parameter Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/master/parameter-dimensi']},
                        {label: 'Parameter Group', icon: 'pi pi-fw pi-id-card', routerLink: ['/master/parameter-group']},
                        {label: 'Final Rating', icon: 'pi pi-fw pi-id-card', routerLink: ['/master/final-rating']},
                        {label: 'Komposit Resiko', icon: 'pi pi-fw pi-id-card', routerLink: ['/master/komposit-resiko']},
                        {label: 'Interest Coverage Ratio', icon: 'pi pi-fw pi-id-card', routerLink: ['/master/icr']},
                    ]
                },
                {
                    label: 'Report', icon: 'pi pi-fw pi-print', routerLink: ['/report'],
                    items: [
                        {label: 'Detail Aspek Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/report/adjust-aspek-dimensi']},
                        {label: 'Aspek Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/report/aspek-dimensi']},
                        {label: 'Aspek Kinerja', icon: 'pi pi-fw pi-id-card', routerLink: ['/report/aspek-kinerja']}
                    ]
                }
            )
        } else {
            this.model.push(
                {
                    label: 'Report', icon: 'pi pi-fw pi-print', routerLink: ['/report'],
                    items: [
                        {label: 'Detail Aspek Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/report/adjust-aspek-dimensi']},
                        {label: 'Aspek Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/report/aspek-dimensi']},
                        {label: 'Aspek Kinerja', icon: 'pi pi-fw pi-id-card', routerLink: ['/report/aspek-kinerja']}
                    ]
                }
            )
        }
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
