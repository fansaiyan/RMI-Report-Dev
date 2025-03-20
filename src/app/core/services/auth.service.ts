import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	jwtHelper: JwtHelperService = new JwtHelperService([]);
	constructor(private http: HttpClient) {
	}
	login(credentials: any) {
		return this.http.post<any>(`${environment.url}web/session/authenticate`, credentials);
	}
	storeLocal(data: any): void {
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
	isSuperAdmin(){
		let session = JSON.parse(this.getAccessToken());
		if(session){
			let allowed_companies = session.user_companies.allowed_companies;
			if(Object.keys(allowed_companies).length > 1) {
				return true;
			}
			return false;
		}
		return false;
	}
	isAssessor(): boolean{
		let session = JSON.parse(this.getAccessToken());
		if(session){
			let groups = session.user_groups;
			return groups.some(group => group === "Assessor");
		}
		return false;
	}
	current_company(){
		let session = JSON.parse(this.getAccessToken());
		if(session){
			return session.user_companies.current_company;
		}
		return 0;
	}
	email(){
		let session = JSON.parse(this.getAccessToken());
		if(session){
			return session.username;
		}
		return null;
	}
	name() {
		let session = JSON.parse(this.getAccessToken());
		if(session){
			return session.name;
		}
		return null;
	}
	logout() {
			localStorage.removeItem('login-session');
	}
}

