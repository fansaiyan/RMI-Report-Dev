import { Pipe, PipeTransform } from '@angular/core';
const PADDING = '00';
@Pipe({
	name: 'viewRupiah'
})
export class ViewRupiahPipe implements PipeTransform {
	private decimalSeparator: string;
	private thousandsSeparator: string;
	constructor() {
		this.decimalSeparator = ',';
		this.thousandsSeparator = '.';
	}
	transform(value: number | string, fractionSize: number = 2): any {
		if (value) {
			let [ integer, fraction = '' ] = (value || '').toString().split(this.decimalSeparator);

			fraction = fractionSize > 0 ? this.decimalSeparator + (fraction + PADDING).substring(0, fractionSize) : '';

			integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);

			return `Rp. ${integer + fraction}`;
		}

		return 'Rp. 0,00';
	}
}
