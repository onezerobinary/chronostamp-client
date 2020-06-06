export enum ActionType {
  dispatchProfile = 'DISPATCH_PROFILE',
  signOut = 'SIGNOUT',
}

export type Action = {
  type: ActionType;
  payload: any;
};
