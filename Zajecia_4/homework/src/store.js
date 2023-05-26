import { createStore } from 'redux';

const initialState = {
  watchedItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        watchedItems: [...state.watchedItems, action.payload]
      };
    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchedItems: state.watchedItems.filter(item => item.address !== action.payload.address)
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
