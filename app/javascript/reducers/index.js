import { combineReducers } from 'redux';
import comments from './comments';
import tickets from './tickets';

export default combineReducers({
  comments,
  tickets,
});
