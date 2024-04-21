import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'Data Master', icon: 'pi pi-fw pi-th-large', routerLink: ['/master'],
                items: [
                    {label: 'Parameter Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/master/parameter-dimensi']},
                    {label: 'Parameter Group', icon: 'pi pi-fw pi-id-card', routerLink: ['/master/parameter-group']},
                    {label: 'Final Rating', icon: 'pi pi-fw pi-id-card', routerLink: ['/master/final-rating']},
                    {label: 'Komposit Resiko', icon: 'pi pi-fw pi-id-card', routerLink: ['/master/komposit-resiko']},
                ]
            },
            {
                label: 'Report', icon: 'pi pi-fw pi-print', routerLink: ['/report'],
                items: [
                    {label: 'Adjust Aspek Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/report/adjust-aspek-dimensi']},
                    {label: 'Hasil Penilaian RMI', icon: 'pi pi-fw pi-id-card', routerLink: ['/report/hasil-penilaian-rmi']},
                    {label: 'Rekomendasi RMI', icon: 'pi pi-fw pi-id-card', routerLink: ['/report/rekomendasi-rmi']},
                ]
            }
        ];
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
