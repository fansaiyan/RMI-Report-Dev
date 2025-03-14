import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { AppMainComponent } from './app.main.component';
import { AuthenticationService } from './core/services/auth.service';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
                    <div class="layout-topbar-logo-wrapper">
                        <a href="#" class="layout-topbar-logo">
<!--                            <img src="assets/layout/images/logo-sikd.png" alt="mirage-layout" />-->
                            <span class="app-name">Risk Maturity Institue</span>
                        </a>
                    </div>
                    <a href="#" class="sidebar-menu-button" (click)="appMain.onMenuButtonClick($event)">
                        <i class="pi pi-bars"></i>
                    </a>
                    <div>
                        <div class="p-d-flex">
                            <div class="p-d-flex p-ai-start p-ml-2">
                                <div class="p-as-center p-ml-2 p-pt-2">
<!--                                    <img src="assets/customs/assets/LogoP.png" alt="" style="height: 4rem;"/>-->
                                </div>
                                <div class="p-as-center p-ml-2">
                                    <span class="" style="color:black;font-size: 1.5rem;">RMI SURVEY</span><br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layout-topbar-right fadeInDown">
                    <ul class="layout-topbar-actions">
                        <li #profile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === profile}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,profile)">
                            <span class="profile-image-wrapper">
                                <img src="assets/customs/assets/nouser.png" alt="mirage-layout" />
                            </span>
                                <span class="profile-info-wrapper">
                                <h3>{{ userInfo.name }}</h3>
                                <span>{{ companies.name }}</span>
                            </span>
                            </a>
                            <ul class="profile-item-submenu fadeInDown">
                                <li class="profile-submenu-header">
                                    <div class="performance">
                                        <span>Weekly Performance</span>
                                        <img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout" />
                                    </div>
                                    <div class="profile">
                                        <img src="assets/customs/assets/nouser.png" alt="mirage-layout"
                                             width="40" />
                                        <h1>{{ userInfo.name }}</h1>
                                        <span>{{ companies.name }}</span>
                                    </div>
                                </li>
                                <li class="layout-submenu-footer">
                                    <button class="signout-button" (click)="logout()">Keluar</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="profile-mobile-wrapper">
                        <li #mobileProfile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === mobileProfile}">
                            <a href="#" (click)="appMain.onTopbarItemClick($event,mobileProfile)">
																			<span class="profile-image-wrapper">
																					<img src="assets/customs/assets/nouser.png" alt="mirage-layout" />
																			</span>
                                <span class="profile-info-wrapper">
																					<h3>{{ userInfo.name }}</h3>
																					<span>{{ companies.name }}</span>
																			</span>
                            </a>
                            <ul class="fadeInDown">
                                <li class="profile-submenu-header">
                                    <div class="performance">
                                        <span>Weekly Performance</span>
                                        <img src="assets/layout/images/topbar/asset-bars.svg" alt="mirage-layout" />
                                    </div>
                                    <div class="profile">
                                        <img src="assets/customs/assets/nouser.png" alt="mirage-layout" width="45" />
                                        <h1>{{ userInfo.name }}</h1>
                                        <span>{{ companies.name }}</span>
                                    </div>
                                </li>
                                <li class="layout-submenu-footer">
                                    <button class="signout-button" (click)="logout()">Keluar</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `
})
export class AppTopBarComponent implements OnInit {
    activeItem: number;
    userInfo: any;
    companies: any = '';
    constructor(
        public appMain: AppMainComponent,
        private confirmationService: ConfirmationService,
        private authService: AuthenticationService,
        private router: Router,
    ) { }
    ngOnInit(): void {
        this.userInfo = this.authService.getTokenInfo();
        this.companies = this.userInfo.user_companies.allowed_companies[this.userInfo.user_companies.current_company];
    }

    mobileMegaMenuItemClick(index) {
        this.appMain.megaMenuMobileClick = true;
        this.activeItem = this.activeItem === index ? null : index;
    }
    logAkses() {
        return this.router.navigate(['log-akses']);
    }
    logout() {
        this.confirmationService.confirm({
            key: 'confirmLogout',
            header: 'Konfirmasi',
            message: 'Keluar Aplikasi?',
            icon: 'pi pi-question',
            acceptLabel: 'Ya',
            rejectLabel: 'Tidak',
            accept: () => {
                console.log('Ok');
                this.authService.logout();
                this.router.navigate(['login']);
            },
            reject: () => {

            }
        });
    }
}
