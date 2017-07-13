import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import {
  ALLOW_REFETCH,
  FETCH_BUSINESSES_ERROR,
  FETCH_BUSINESSES_REQUEST,
  FETCH_BUSINESSES_SUCCESS,
} from '../actions/Results';
import {
  DISTANCE_FILTER_TYPES,
  RATING_SORT_TYPES,
} from '../utility/FilterTypes';
import {
  FETCH_LOCATION_ERROR,
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
} from '../actions';
import {
  INIT_SORT,
  SORT_BUSINESSES,
  TOGGLE_DISTANCE_FILTER,
  TOGGLE_RATING_SORT,
  UPDATE_PRICES,
} from '../actions/FilterBar';
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from '../actions/Account';
import { UPDATE_FOOD_TYPE } from '../actions/FoodType';
import { findIndexOf, removeFromArr, sortArr } from '../utility/arrayMethods';

export const location = (state = {}, action) => {
	switch (action.type) {
		case FETCH_LOCATION_SUCCESS:
			return {
				...action.location, fetching: false
			}
		case FETCH_LOCATION_ERROR:
			console.log(action.error);
			return {
				longitude: null, latitude: null, fetching: false
			}
		case FETCH_LOCATION_REQUEST:
			return {
				longitude: null, latitude: null, fetching: true
			}
		default:
			return state;
	}
}

export const foodTypes = (state = [], action) => {
	switch (action.type) {
		case UPDATE_FOOD_TYPE:
			// does not exist: add new foodType
			if (state.indexOf(action.foodType) === -1) {
				return [
					...state, action.foodType
				]
			}
			// exists: remove foodType
			else {
				let index = findIndexOf(state, action.foodType);
				return removeFromArr(state, index);
			}
		default:
			return state;
	}
}

export const account = (state = {}, action) => {
	switch (action.type) {
		case SIGNUP_REQUEST:
		case LOGIN_REQUEST:
			return {
				...state,
				isFetching: true
			};
		case SIGNUP_SUCCESS:
		case LOGIN_SUCCESS:
			console.log('cookie WAS: ' + document.cookie);
			let date = new Date();
	        date.setTime(date.getTime()+(180000)); // 3 min expiration
	        document.cookie = 'token=' + action.token + '; expires=' + date.toGMTString();
	        console.log('cookie is NOW: ' + document.cookie);
			return {
				...state,
				isFetching: false,
				email: action.email
			};
		case SIGNUP_ERROR:
		case LOGIN_ERROR:
			console.log(action.error);
			return state;
		default:
			return state;
	}
}

export const filters = (state = {}, action) => {
	switch (action.type) {
		case TOGGLE_RATING_SORT:
			return {
				...state,
				rating_si: (state.rating_si + 1) % RATING_SORT_TYPES.length
			};
		case INIT_SORT:
			return {
				...state,
				rating_si: 1,
				prices: [1, 2, 3, 4],
				distance_fi: 0
			};
		case UPDATE_PRICES:
			if (state === 'undefined') {
				return state;
			}
			// 0-indexing
			let i = action.price - 1;
			// remove price
			if (state.prices[i] != null) {
				let newPrices = state.prices.slice();
				// 0-indexing
				newPrices[i] = null;
				return {
					...state,
					prices: newPrices
				};
			}
			// add price
			else {
				let newPrices = state.prices.slice();
				newPrices[i] = action.price;
				return {
					...state,
					prices: newPrices
				}
			}
		case TOGGLE_DISTANCE_FILTER:
			return {
				...state,
				distance_fi: (state.distance_fi + 1) % DISTANCE_FILTER_TYPES.length
			};
		default:
			return state;
	}
}

export const businesses = (state = {}, action) => {
	switch (action.type) {
		case FETCH_BUSINESSES_SUCCESS:
			return {
				...state, 
				results: action.results,
				fetched: true
			};
		case FETCH_BUSINESSES_ERROR:
			console.log(action.error);
			return state;
		case FETCH_BUSINESSES_REQUEST:
			return state;
		case ALLOW_REFETCH:
			return {
				...state,
				fetched: false,
			};
		case SORT_BUSINESSES:
			return {
				...state,
				results: sortArr(state.results, state.sorting.rating_si)
			};
		case TOGGLE_RATING_SORT:
		case INIT_SORT:
		case UPDATE_PRICES:
		case TOGGLE_DISTANCE_FILTER:
			return {
				...state,
				sorting: filters(state.sorting, action)
			};
		default:
			return state;
	}
}

export const appReducer = combineReducers({
	businesses: businesses,
	user: combineReducers({
		location,
		foodTypes,
		account
	}),
	form: formReducer
})

// Sort by rating. Choose category of price. Always sort by distance.


