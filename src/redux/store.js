import { combineReducers } from 'redux';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import todoReducer from './reducers/todo';
import ReduxThunk from 'redux-thunk'

const thunk = (store) => {
	return next => {
		return action => {
			if (typeof action == 'function'){

				return action(store.dispatch);
			}

			return next(action);
		}
	}
}

const rootReducer = combineReducers({
	todo: todoReducer,
	middleware: applyMiddleware(ReduxThunk),
});

const store = configureStore({
	reducer: rootReducer,
	
});

export default store;