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
                    label: 'RMI', icon: 'pi pi-fw pi-list', routerLink: ['/rmi'],
                    items: [
                        {
                            label: 'Report', icon: 'pi pi-fw pi-list', routerLink: ['/rmi/report'],
                            items: [
                                {label: 'Detail Aspek Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/rmi/report/adjust-aspek-dimensi']},
                                {label: 'Aspek Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/rmi/report/aspek-dimensi']},
                                {label: 'Aspek Kinerja', icon: 'pi pi-fw pi-id-card', routerLink: ['/rmi/report/aspek-kinerja']}
                            ]
                        }
                    ]
                },
                {
                    label: 'SMI', icon: 'pi pi-fw pi-list', routerLink: ['/smi'],
                    items: [
                        {label: 'Upload Document', icon: 'pi pi-fw pi-upload', routerLink: ['/smi/upload-document']},
                        {label: 'Self Assessment', icon: 'pi pi-fw pi-list', routerLink: ['/smi/survey']},

                    ]
                }
            )
        } else {
            this.model.push(
                {
                    label: 'RMI', icon: 'pi pi-fw pi-list', routerLink: ['/rmi'],
                    items: [
                        {
                            label: 'Report', icon: 'pi pi-fw pi-list', routerLink: ['/rmi/report'],
                            items: [
                                {label: 'Detail Aspek Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/rmi/report/adjust-aspek-dimensi']},
                                {label: 'Aspek Dimensi', icon: 'pi pi-fw pi-id-card', routerLink: ['/rmi/report/aspek-dimensi']},
                                {label: 'Aspek Kinerja', icon: 'pi pi-fw pi-id-card', routerLink: ['/rmi/report/aspek-kinerja']}
                            ]
                        }
                    ]
                },
                {
                    label: 'SMI', icon: 'pi pi-fw pi-list', routerLink: ['/smi'],
                    items: [
                        {label: 'Upload Document', icon: 'pi pi-fw pi-upload', routerLink: ['/smi/upload-document']},
                        {label: 'Self Assessment', icon: 'pi pi-fw pi-list', routerLink: ['/smi/survey']},

                    ]
                }
            )
        }
        if(this.authService.isAssessor()){
            this.model[2].items.push(
                {label: 'Report Summary', icon: 'pi pi-fw pi-print', routerLink: ['/smi/report-summary']},
            )
        }
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
