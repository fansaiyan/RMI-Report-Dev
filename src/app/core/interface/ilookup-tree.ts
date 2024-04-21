export interface ILookupTree {
  label : string;
  data_kode : string;
  data_nama : string;
  data_id : number;
  data_id_parent : number;
  expandedIcon : string;
  collapsedIcon : string;
  children : null;
  label_parent : string;
  this_header : boolean;
  this_level : string;
  this_type : string;
}
