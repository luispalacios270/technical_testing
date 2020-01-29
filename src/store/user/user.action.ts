import { createAction, props } from '@ngrx/store';

import { UserInfo } from '../../app/iuser';

export const assignUserToCheckDetails = createAction(
  '[User] assignUserToCheckDetail',
  props<UserInfo>()
);
