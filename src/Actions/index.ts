export enum ActionType {
  dispatchProfile = 'DISPATCH_PROFILE',
  signOut = 'SIGNOUT',
  setTab = 'SETTAB',
  account = 'ACCOUNT',
}

export type Action = {
  type: ActionType;
  payload: any;
};
