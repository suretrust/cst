import { combineReducers } from 'redux';
import comments from './comments';
import tickets from './tickets';
import openTickets from './openTickets';
import agents from './agents';
import admins from './admins';
import clients from './clients';

export default combineReducers({
  comments,
  tickets,
  openTickets,
  agents,
  clients,
  admins,
});
