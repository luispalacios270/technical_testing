import * as userActions from '../user/user.action';

import { Action, createReducer, on } from '@ngrx/store';

import { UserInfo } from '../../app/iuser';

const userReducer = createReducer(
  {},
  on(userActions.assignUserToCheckDetails, (_, prop: UserInfo) => prop)
);

export function reducer(state: UserInfo | undefined, action: Action) {
  return userReducer(state, action);
}
