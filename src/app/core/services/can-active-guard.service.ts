import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
	providedIn: 'root'
})
export class CanActiveGuardService implements CanActivate {
	private titleComponent = new BehaviorSubject<string>(null);
	public titleComponent$ = this.titleComponent.asObservable();
	constructor(
		private jwtHelper: JwtHelperService,
		private router: Router
	) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		const title = route.data['setTitle'] as string;
		const user = JSON.parse(localStorage.getItem('login-session'));
		if (!user) {
			this.router.navigate([ 'login' ], { queryParams: { returnUrl: state.url } });
			return false;
		}
		const url: any[] = state.url.split('/');
		let label = [];
		let temp = '';
		for (let i = 0; i < url.length; i++) {
			if (url[i] !== '') temp += '/' + url[i];
		}
		label.push({ label: temp });
		if (title) {
			this.titleComponent.next(title);
		} else {
			this.titleComponent.next('');
		}
		return true;
	}
}
