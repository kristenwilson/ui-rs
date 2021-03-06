import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Route as NestedRoute } from '@folio/stripes/core';
import PatronRequestsRoute from './routes/PatronRequestsRoute';
import CreateEditRoute from './routes/CreateEditRoute';
import ViewRoute from './routes/ViewRoute';
import DetailsRoute from './routes/DetailsRoute';
import FlowRoute from './routes/FlowRoute';
import PullSlipRoute from './routes/PullSlipRoute';
import Settings from './settings';
import AppNameContext from './AppNameContext';

class ResourceSharing extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    actAs: PropTypes.string.isRequired,
    stripes: PropTypes.shape({
      logger: PropTypes.shape({
        log: PropTypes.func,
      }),
    }),
  };

  render() {
    const {
      actAs,
      match: { path },
      location: { search }
    } = this.props;

    const appName = path.substring(1).replace(/\/.*/, '');
    this.props.stripes.logger.log('appName', `us-rs: path='${path}', appName='${appName}'`);

    if (actAs === 'settings') {
      return <Settings {...this.props} appName={appName} />;
    }
    return (
      <AppNameContext.Provider value={appName}>
        <Switch>
          <Redirect
            exact
            from={path}
            to={`${path}/requests`}
          />
          <Route path={`${path}/requests/create`} component={CreateEditRoute} />
          <Route path={`${path}/requests/edit/:id`} component={CreateEditRoute} />
          <Redirect
            exact
            from={`${path}/requests/view/:id`}
            to={`${path}/requests/view/:id/details${search}`}
          />
          <Route path={`${path}/requests/view/:id/pullslip`} component={PullSlipRoute} />
          <NestedRoute path={`${path}/requests/view/:id`} component={ViewRoute}>
            <NestedRoute path={`${path}/requests/view/:id/details`} component={DetailsRoute} />
            <NestedRoute path={`${path}/requests/view/:id/flow`} component={FlowRoute} />
          </NestedRoute>
          <Route
            path={`${path}/requests/:action?`}
            render={(props) => <PatronRequestsRoute {...props} appName={appName} />}
          />
        </Switch>
      </AppNameContext.Provider>
    );
  }
}

export default ResourceSharing;
