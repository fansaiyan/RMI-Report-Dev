import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IMenu } from '../core/interface/imenu';
import { AuthenticationService } from '../core/services/auth.service';
import { IfService } from '../core/services/if.service';

@Injectable()
export class getMenuResolver implements Resolve<IMenu[]> {
	constructor(private service: IfService) {}
	resolve(): Observable<IMenu[]> {
		return this.service.get('Approle/list-menu') as Observable<IMenu[]>
	}
}