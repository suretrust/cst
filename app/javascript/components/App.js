import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';
import Ticket from './Ticket';
import TicketForm from './TicketForm';
import ClosedTickets from './ClosedTickets';
import Clients from './Clients';
import Agents from './Agents';
import Admins from './Admins';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/new-ticket" exact component={TicketForm} />
        <Route path="/closed-tickets" exact component={ClosedTickets} />
        <Route path="/clients" exact component={Clients} />
        <Route path="/admins" exact component={Admins} />
        <Route path="/agents" exact component={Agents} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/ticket/:id" component={Ticket} />
        <Route path="/admin-dashboard" component={AdminDashboard} />
        <Route path="/agent-dashboard" component={AgentDashboard} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
}

export default App;
