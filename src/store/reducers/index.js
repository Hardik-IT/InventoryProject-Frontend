import { combineReducers } from 'redux';
import imageReducer from './imageReducer';
import categoryReducer from './categoryReducer';
import itemReducer from './itemReducer';

const rootReducer = combineReducers({
  image: imageReducer,
  category: categoryReducer,
  item: itemReducer,
});

export default rootReducer;