import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './auth-reducer';
import generalReducer from './general-reducer';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  auth: authReducer,
  general: generalReducer
});

export default rootReducer;
