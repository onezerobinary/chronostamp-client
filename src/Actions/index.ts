export enum ActionType {
  dispatchProfile = 'DISPATCH_PROFILE',
  signOut = 'SIGNOUT',
  setTab = 'SETTAB',
}

export type Action = {
  type: ActionType;
  payload: any;
};
