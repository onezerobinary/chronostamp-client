export enum ActionType {
  dispatchProfile = 'DISPATCH_PROFILE',
}

export type Action = {
  type: ActionType;
  payload: any;
};
