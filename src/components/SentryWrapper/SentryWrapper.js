import { PureComponent } from 'react';
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';

class SentryWrapper extends PureComponent {
  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }

  render() {
    return this.props.children;
  }
}

SentryWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default SentryWrapper;
