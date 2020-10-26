/**
 * Wraps fetch calls and handles errors
 *
 * @param url - the url
 * @param method - http method
 * @param headers - headers sent with the request
 * @param body - the request body
 * @param signal - signal property on Request
 * @param errorKey - the string sent to Rollbar describing the error
 * @param errorOptions - any additional data to be sent to Rollbar
 * @param errorCallback - any additional code that should be run on error
 */

const handleFetch = (url, options) => {
  const {
    method = 'GET',
    headers = undefined,
    errorKey,
    errorOptions = {},
    errorCallback,
    body = undefined,
    signal = undefined,
  } = options;

  return fetch(url, {
    method,
    headers,
    body,
    signal,
  }).catch((error) => {
    if (error.name !== 'AbortError' && errorKey) {
      window?.Rollbar?.error(errorKey, {
        errorMessage: error.message || JSON.stringify(error),
        ...errorOptions,
      });
    }
    if (errorCallback) {
      errorCallback(error);
    }
    return Promise.reject(error);
  });
};

export default handleFetch;
