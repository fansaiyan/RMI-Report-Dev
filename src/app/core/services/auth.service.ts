import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	jwtHelper: JwtHelperService = new JwtHelperService([]);
	constructor(private http: HttpClient) {
	}
	login(credentials: any) {
		return this.http.post<any>(`${environment.url}web/session/authenticate`, credentials);
	}
	storeLocal(data: any) {
		localStorage.setItem('login-session', JSON.stringify(data));
	}
	getTokenInfo() {
		return JSON.parse(localStorage.getItem('login-session'));
	}
	getAccessToken() {
		return localStorage.getItem('login-session');
	}
	getUser() {
		return JSON.parse(localStorage.getItem('user'));
	}

	logout() {
			localStorage.removeItem('login-session');
	}
}

