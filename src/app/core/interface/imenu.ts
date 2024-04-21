export interface IMenu {
	roleId: string;
	menuId: string;
	parentId: string;
	label: string;
	icon: string;
	routerLink: null;
	items: IMenu[];
}
export interface IMenuTree {
	label: string;
	data: string;
	expandedIcon: string;
	collapsedIcon: string;
	roleId: string;
	menuId: string;
	parentId: string;
	routerLink: null;
	children: IMenuTree[];
}
export interface IMenuTreeProgram {
	label: string;
	data: string;
	expandedIcon: string;
	collapsedIcon: string;
	idpgrmrkpd: string;
	children: null;
}