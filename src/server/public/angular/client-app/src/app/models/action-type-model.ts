export enum ActionType {
  edit = 'Edit',
  add = 'Add',
}

export interface TableActions {
  accounts: boolean;
  add: boolean;
  delete: boolean;
  edit: boolean;
}
