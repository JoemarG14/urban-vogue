import { USER_TYPES } from "./user.types";
import { createAction } from '../../utils/reducer/reducer.utils';

export const setUserInfo = (user) => createAction(USER_TYPES.SET_USER_INFO, user);
