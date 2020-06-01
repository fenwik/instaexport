import 'isomorphic-fetch';
import qs from 'querystringify';

const buildApiUrl = (params) => {
  const {
    apiPath = '/',
    endpoint,
    queryParams
  } = params;

  let {
    protocol,
    host
  } = params;

  protocol = protocol ? `${protocol}:` : '';

  if (!host) {
    if (window && window.location) {
      host = window.location.host; // eslint-disable-line prefer-destructuring
    } else {
      throw new Error('Can\'t set request url hostname');
    }
  }

  const path = apiPath + endpoint;
  const query = qs.stringify(queryParams, true);

  return `${protocol}//${host}${path}${query}`;
};

const buildOptions = (params) => {
  const {
    method = 'GET',
    contentType = 'json',
    headers = {},
    data
  } = params;

  const options = {
    method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...headers
    }
  };

  if (data && contentType === 'json') {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  if (data && contentType === 'form-data') {
    const body = (!Array.isArray(data)) ? [data] : data;

    options.body = new FormData();
    body.forEach((el) => {
      if (el.filename) {
        options.body.append(el.name, el.value, el.filename);
      } else {
        options.body.append(el.name, el.value);
      }
    });
  }

  return options;
};

const makeRequest = (url, options) => fetch(url, options).then((response) => {
  const {
    status,
    ok,
    headers,
    statusText
  } = response;
  const result = {
    statusCode: status,
    statusText,
    headers
  };

  return response.clone().text().then(({ length }) => {
    if (!length) {
      if (!ok) {
        throw result;
      }

      return result;
    }

    const contentType = headers.get('Content-Type');
    const isJson = contentType && contentType.indexOf('application/json') !== -1;
    const isText = contentType && contentType.indexOf('text/') !== -1;

    let promise;

    if (isJson) {
      promise = response.json();
    } else if (isText) {
      promise = response.text();
    } else {
      promise = response.blob();
    }

    return promise.then((data) => {
      result.data = data || null;

      if (!ok) {
        throw result;
      }

      return result;
    });
  });
});

const actionWith = (action, status, payload) => ({
  ...action,
  status,
  ...payload
});

const createApiMiddleware = (options = {}) => {
  const {
    protocol,
    host,
    apiPath,
    sendStatus = 'SEND',
    successStatus = 'SUCCESS',
    failStatus = 'FAIL'
  } = options;

  return () => (next) => (action) => {
    if (!action) {
      return next(action);
    }

    const { request } = action;

    if (!request) {
      return next(action);
    }

    const {
      endpoint,
      queryParams,
      method,
      contentType,
      headers,
      data
    } = request;

    const reqUrl = request.url || buildApiUrl({
      protocol,
      host,
      apiPath,
      endpoint,
      queryParams
    });

    if (!reqUrl) {
      throw new Error('Can\'t build request url');
    }

    const reqOptions = buildOptions({
      method,
      contentType,
      headers,
      data
    });

    if (!reqOptions) {
      throw new Error('Can\'t build request options');
    }

    next(actionWith(action, sendStatus));

    return makeRequest(reqUrl, reqOptions)
      .then(
        (response) => next(actionWith(action, successStatus, {
          request: {
            ...request,
            response
          }
        })),
        (response) => next(actionWith(action, failStatus, {
          request: {
            ...request,
            response
          }
        }))
      );
  };
};

export default createApiMiddleware;
