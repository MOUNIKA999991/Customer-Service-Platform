import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ServiceRequestForm from './components/ServiceRequestForm';
import ServiceRequests from './components/ServiceRequests';
const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/submit-request" component={ServiceRequestForm} />
      <Route path="/requests/:category" component={ServiceRequests} />
    </Switch>
  </Router>
);
export default App;
