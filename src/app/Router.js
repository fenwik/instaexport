import React, { memo } from 'react';
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import Home from '../pages/Home';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default withRouter(memo(Router));
